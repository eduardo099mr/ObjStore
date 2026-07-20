import database from "infra/database";

beforeAll(async () => {
  await database.query("drop schema public cascade; create schema public;");
})

test("should return status 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");
  const responseBody = await response.json();

  expect(response.status).toBe(200);
  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);

  console.log("Pending Migrations: ", responseBody);
});
