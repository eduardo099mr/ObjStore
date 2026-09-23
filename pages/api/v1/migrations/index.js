import database from "/infra/database";
import migrationsRunner from "node-pg-migrate";
import { join } from "node:path";

export default async function status(request, response) {
  const allowedMethods = ["POST", "GET"];
  let dbClient;

  if (!allowedMethods.includes(request.method)) {
    return response
      .status(405)
      .json({ error: `Method ${request.method} Not Allowed` });
  }

  try {
    dbClient = await database.getNewClient();
    const defaultMigrationsOptions = {
      dbClient: dbClient,
      dryRun: true,
      direction: "up",
      dir: join("infra", "migrations"),
      migrationsTable: "pgmigrations",
      verbose: true,
    };

    if (request.method === "GET") {
      const pendingMigrations = await migrationsRunner(
        defaultMigrationsOptions,
      );
      return response.status(200).json(pendingMigrations);
    }

    if (request.method === "POST") {
      const migratedMigrations = await migrationsRunner({
        ...defaultMigrationsOptions,
        dryRun: false,
      });

      if (migratedMigrations.length > 0) {
        return response.status(201).json(migratedMigrations);
      }

      return response.status(200).json(migratedMigrations);
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await dbClient.end();
  }
}
