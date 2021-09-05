const request = require("supertest");
const app = require("../index");
let postId;

describe("Test different endpoints", () => {
  it("POST /api/posts/create", async () => {
    const data = {
      title: "Hola Mundo",
      body: "Como estan?",
    };
    const response = await request(app)
      .post("/api/posts/create")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201);
      postId = response.body._id;
  });

  it("respond with code 400 on bad request", async () => {
    const data = {};
    await request(app)
      .post("/api/posts/create")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .expect('"Post not created"')
  });

  it("GET /api/posts/list", async () => {
    await request(app)
      .get("/api/posts/list")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
  });

  it("GET /api/posts/get_post/:id", async () => {
    await request(app)
      .get(`/api/posts/get_post/${postId}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
  })

  it("respond with code 404", async () => {
    await request(app)
      .get("/api/posts/get_post/6134685d7f2c70efa89addeasdsd")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404);
  });
})