import supertest from "supertest";
import app from "../src/app";

describe("POST /tasks", () => {
  it("given a valid task it should return 201", async () => {
    const body = {
      name: "banana",
      price: 10,
    };

    const result = await supertest(app).post("/fruits").send(body);
    const status = result.status;

    expect(status).toEqual(201);
  });

  it("given an invalid task it should return 422", () => {
    // Aqui vai o código desse teste
  });

  it("given a task with duplicate title it should return 409", () => {
    // Aqui vai o código desse teste
  });
});
