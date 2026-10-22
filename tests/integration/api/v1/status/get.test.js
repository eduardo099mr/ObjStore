import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitforAllServices();
});

test("get 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();
  const updatedTime = new Date(responseBody.updated_at).toISOString();

  console.log("Response body:", responseBody);

  expect(response.status).toBe(200);
  expect(responseBody.updated_at).toEqual(updatedTime);
  expect(responseBody.dependencies.version).toEqual("16.0");
  expect(responseBody.dependencies.maxConnections).toEqual("100");
  expect(responseBody.dependencies.openedConnections).toEqual(1);
});
