import database from "infra/database.js";

export default async function Status(request, response) {
  const databaseName = process.env.POSTGRES_DB;
  const openedConnectionsResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const openedConnValue = openedConnectionsResult.rows[0].count;

  const maxCOnnectionsResult = await database.query("SHOW max_connections;");
  const maxConnValue = maxCOnnectionsResult.rows[0].max_connections;

  const versionResult = await database.query("SHOW server_version;");
  const versionValue = versionResult.rows[0].server_version;

  const updatedAt = new Date().toISOString();
  return response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      version: versionValue,
      maxConnections: maxConnValue,
      openedConnections: openedConnValue,
    },
  });
}
