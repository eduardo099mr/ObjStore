test("should return status 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();
  const ParsedUpdatedAt = new Date(responseBody.updated_at).toISOString()
  
  expect(response.status).toBe(200);
  expect(responseBody.soma).toBe(2);
  expect(responseBody.updated_at).toEqual(ParsedUpdatedAt);
  expect(responseBody.dependencies.version).toEqual("16.0");
  expect(responseBody.dependencies.max_connections).toEqual(100);
  expect(responseBody.dependencies.opened_connections).toBe(1);
  
  console.log(responseBody);
  console.log("Soma: 1 + 1 = ", responseBody.soma);
  console.log("Updated at: ", responseBody.updated_at);
  console.log("Version: ", responseBody.dependencies.version);
  console.log("Max Connections: ", responseBody.dependencies.max_connections);
  console.log("Opened Conections: ", responseBody.dependencies.opened_connections);
});
