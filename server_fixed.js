const express = require("express");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/server");

const Post = mongoose.model("Post", { title: String, body: String });

const app = express();

app.use(express.json());

const PORT =  process.env.PORT || 3000;
const PRIVAVE_API_KEY = process.env.PRIVAVE_API_KEY || "api_key";

app.get("/api/posts/list", async (req, res) => {
  const posts = await Post.find({});
  return res.status(200).json({ posts });
});

app.post("/api/posts/create", async (req, res) => {
  const { title, body } = req.body;
  const newPost = new Post({ title, body });
  await newPost.save();
  return res.status(200).json({ newPost });
});

app.delete("/api/posts/delete/:id", async (req, res) => {
  const { params: { id: _id } } = req;
  await Post.findOneAndRemove({ _id });
  return res.status(200).json({ msg: "Post Deleted" });
});

app.get("/api/posts/:id", async (req, res) => {
  const { params: { id: _id } } = req;
  const post = await Post.findById({ _id });
  return res.status(200).json({post});
});

app.put("/api/posts/update/:id", async (req, res) => {
  const { body: { title, body} } = req;
  const newPost = await Post.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: { title, body } }
  );
  return res.status(200).json({newPost});
});

app.listen(PORT, () => {
  console.log("Listening");
});
