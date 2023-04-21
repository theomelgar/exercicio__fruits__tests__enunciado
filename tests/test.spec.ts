import supertest from "supertest";
import app from "../src/app";
import { Fruit } from "repositories/fruits-repository";

describe("POST /fruits", () => {
  it("given a valid task it should return 201", async () => {
    const body = {
      name: "banana",
      price: 10,
    };

    const result = await supertest(app).post("/fruits").send(body);
    const status = result.status;

    expect(status).toEqual(201);
  });

  it("given a invalid task it should return 422", async () => {
    const body = {
      name: 10,
      price: 10,
    };

    const result = await supertest(app).post("/fruits").send(body);
    const status = result.status;

    expect(status).toEqual(422);
  });

  it("given a task with duplicate title it should return 409", async () => {
    const body = {
      name: "banana",
      price: 10,
    };

    const result = await supertest(app).post("/fruits").send(body);
    const status = result.status;

    expect(status).toEqual(409);
  });

  it("Get all fruits", async () => {
    const result = await supertest(app).get("/fruits");
    const status = result.status as number;
    expect(status).toEqual(200);

    const fruits = result.body as Fruit[];
    expect(fruits).toHaveLength(1);

    expect(fruits).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          price: expect.any(Number),
        })
      ])
    );
  });

  it("get a fruit", async () => {
    const result = await supertest(app).get("/fruits/1");

    const status = result.status as number;
    expect(status).toEqual(200);

    const fruit = result.body as Fruit;
    expect(fruit.name).toBe("banana");
    expect(fruit.id).toBe(1);
    expect(fruit.price).toBe(10);
  });
});
