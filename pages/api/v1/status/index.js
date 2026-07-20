import database from "infra/database";

export default async function status(request, response) {
  const somaResult = await database.query("SELECT 1 + 1 as sum;");
  const somaValue = parseInt(somaResult.rows[0].sum);

  const updatedAt = new Date().toISOString();

  const serverVersionResult = await database.query("SHOW server_version;");
  const serverVersionValue = serverVersionResult.rows[0].server_version;

  const maxConnResult = await database.query("SHOW max_connections;")
  const maxConnValue = parseInt(maxConnResult.rows[0].max_connections);

  const databaseName = process.env.POSTGRES_DB;
  const openedConnResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName]
  })
  const openedConnValue = openedConnResult.rows[0].count;

  return response.status(200).json({ 
    soma: somaValue,
    updated_at: updatedAt,
    dependencies: {
      version: serverVersionValue,
      max_connections: maxConnValue,
      opened_connections: openedConnValue
    }
   });
}
