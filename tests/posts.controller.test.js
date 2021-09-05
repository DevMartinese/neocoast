const {
  createPost,
  getPosts,
  getPost,
  putPost,
  delPost,
} = require("../controllers/postsController");
const Posts = require("../models/Posts");
const httpMocks = require("node-mocks-http");
const newPost = require("../mocks/posts.mock.json");
const allPosts = require("../mocks/all-todos.mock.json");
let req, res;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

Posts.create = jest.fn();
Posts.find = jest.fn();
Posts.findById = jest.fn();

describe("postsController createPost", () => {
  beforeEach(() => {
    req.body = newPost;
  })
  
  it("should have a createPost method", () => {
    expect(typeof createPost).toBe("function");
  });
  
  it("should call a Post.create", async () => {
    await createPost(req, res);
    expect(Posts.create).toBeCalledWith(newPost);
  });
  
  it("should return 201 response code", async () => {
    await createPost(req, res);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });
  
  it("should return json body in response", async () => {
    Posts.create.mockReturnValue(newPost);
    await createPost(req, res);
    expect(res._getJSONData()).toStrictEqual(newPost);
  })
  
  it("should return 400 response code", async () => {
    req.body = {};
    await createPost(req, res);
    expect(res.statusCode).toBe(400);
  });
});

describe("postsController getPosts", () => {
  it("should have a getPosts method", () => {
    expect(typeof getPosts).toBe("function");
  });

  it("should call a Post.find", async () => {
    await getPosts(req, res);
    expect(Posts.find).toHaveBeenCalledWith({});
  });

  it("should return response with status 200 and all todos", async () => {
    Posts.find.mockReturnValue(allPosts);
    await getPosts(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(allPosts);
  });
});

describe("postsController getPost", () => {
  it("should have a getPost method", () => {
    expect(typeof getPost).toBe("function");
  });

  it("should call Posts.findById", async () => {
    req.params.id = "5d5ecb5a6e598605f06cb945";
    await getPost(req, res);
    expect(Posts.findById).toBeCalledWith({"_id": "5d5ecb5a6e598605f06cb945"});
  });

  it("should return response with status 200 ", async () => {
    Posts.findById.mockReturnValue(newPost);
    await getPost(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(newPost);
    expect(res._isEndCalled()).toBeTruthy();
  });
});

// describe("postsController putPost", () => {
//   it("should have a putPost method", () => {
//     expect(typeof putPost).toBe("function");
//   });
// });

// describe("postsController delPost", () => {
//     it("should have a delPost method", () => {
//     expect(typeof delPost).toBe("function");
//   });
// });
