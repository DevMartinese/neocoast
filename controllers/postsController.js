const Posts = require("../models/Posts");

exports.createPost = async (req, res) => {
  const { title, body } = req.body;
  if (title && body) {
    const post = await Posts.create(req.body);
    return res.status(201).json(post);
  }
  res.status(400).json("Post not created");
};

exports.getPosts = async (req, res) => {
  const posts = await Posts.find({});
  res.status(200).json(posts);
};

exports.getPost = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const post = await Posts.findById({ _id });

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).send();
    }

  } catch (error) {
    res.status(404).json({ msg: error });
  }
};

exports.putPost = async (req, res) => {
  const { title, body } = req.body;
  const post = await Posts.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: { title, body } }
  );
  res.status(200).json(post);
};

exports.delPost = async (req, res) => {
  await Posts.findOneAndRemove({ _id: req.params.id });
  res.status(200).json({ msg: "Post Deleted" });
};
