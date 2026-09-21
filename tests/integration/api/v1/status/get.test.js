test("should return status OK", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  
  expect(response.status).toBe(200);
  
  console.log(response.status);
})