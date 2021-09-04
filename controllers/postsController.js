const Posts = require("../models/Posts");

exports.createPost = async (req, res) => {
  const post = new Posts(req.body);
  await post.save();
  res.json({ post });
};

exports.getPosts = async (req, res) => {
  const posts = await Posts.find({});
  res.json({ posts });
};

exports.getPost = async (req, res) => {
  const { id: _id } = req.params;
  const post = await Posts.findById({ _id });
  res.json({ post });
};

exports.putPost = async (req, res) => {
  const { title, body } = req.body;
  const post = await Posts.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: { title, body } }
  );
  res.json({ post });
};

exports.delPost = async (req, res) => {
  await Posts.findOneAndRemove({ _id: req.params.id });
  res.json({ msg: "Post Deleted" });
};
