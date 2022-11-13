const express = require("express");
const Post = require("./models/Post");
const User = require("./models/User");
const router = express.Router();

// get all posts
router.get("/posts", async (req, res) => {
  const posts = await Post.find();
  res.send(posts);
});

// get a post by id
router.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById({ _id: req.params.id });
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Post not found" });
  }
});

// get a user by id
router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id });
    res.send(user);
  } catch {
    res.status(404);
    res.send({ error: "User not found" });
  }
});

// get all users
router.get("/users", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

// create a post
router.post("/posts/create", async (req, res) => {
  const post = new Post(req.body);
  await post.save();
  res.send(post);
});

//create a user
router.post("/users/create", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send(user);
});

//update a post
router.patch("/posts/update/:id", async (req, res) => {
  try {
    const post = await Post.findById({ _id: req.params.id });

    if (req.body.userId) post.userId = req.body.userId;
    if (req.body.content) post.content = req.body.content;
    post.date = Date.now();
    if (req.body.isReply) post.isReply = req.body.isReply;
    if (req.body.repliedToId) post.repliedToId = req.body.repliedToId;
    if (req.body.votes) post.votes = req.body.votes;

    await post.save();
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Post not found" });
  }
});
module.exports = router;
