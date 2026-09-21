import database from "/infra/database";

export default async function status(request, response){
  const updatedAt = new Date().toISOString();
  
  const svVersionValue = await database.query("SHOW server_version;");
  const svVersionResult = svVersionValue.rows[0].server_version;
  
  const maxConnValue = await database.query("SHOW max_connections;");
  const maxConnResult = parseInt(maxConnValue.rows[0].max_connections);

  const databaseName = process.env.POSTGRES_DB;
  const openedConnValue = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName]
  });
  const openedConnResult = openedConnValue.rows[0].count;

  response.status(200).json({ updated_at: updatedAt, dependencies: { 
    version: svVersionResult,
    maxConnections: maxConnResult,
    openedConnections: openedConnResult,
  } });
}