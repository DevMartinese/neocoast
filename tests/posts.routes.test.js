const request = require("supertest");
const app = require("../index");
let postId;

describe("POST /api/posts/create", () => {
  it("create posts in database", async () => {
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
});

describe("GET /api/posts/list", () => {
  it("respond with json containing list of posts", async () => {
    await request(app)
      .get("/api/posts/list")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

// describe("GET /api/posts/get_post/:id", () => {
//   it("respond with a single post", async () => {
//     await request(app)
//       .get(`/api/posts/get_post/${post}`)
//       .set("Accept", "application/json")
//       .expect("Content-Type", /json/)
//       .expect(200)
//   })
// })