test("should return status OK", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();
  const parsedDate = new Date(responseBody.updated_at).toISOString();
  
  console.log(response.status);
  console.log(responseBody);
  
  expect(response.status).toBe(200);
  expect(responseBody.updated_at).toBe(parsedDate);
  expect(responseBody.dependencies.version).toBe('16.0');
  expect(responseBody.dependencies.maxConnections).toBe(100);
  expect(responseBody.dependencies.openedConnections).toBe(1);
  
})