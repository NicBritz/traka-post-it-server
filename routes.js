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

module.exports = router;
