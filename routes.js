const express = require("express");
const Post = require("./models/Post");
const User = require("./models/User");
const router = express.Router();

// get all posts
router.get("/posts", async (req, res) => {
  const posts = await Post.find();
  res.send(posts);
});

// get all users
router.get("/users", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

// create a post
router.post("/post", async (req, res) => {
  const post = new Post(req.body);
  await post.save();
  res.send(post);
});

//create a user
router.post("/user", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send(user);
});

module.exports = router;
