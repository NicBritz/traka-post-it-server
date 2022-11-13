const express = require("express");
const Post = require("./models/Post");
const User = require("./models/User");
const router = express.Router();

// get all posts
router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    if (!posts) throw new Error();
    res.send(posts);
  } catch {
    res.status(404);
    res.send({ error: "No Posts found" });
  }
});

// get a post by id
router.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById({ _id: req.params.id });
    if (!post) throw new Error();
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
    if (!user) throw new Error();
    res.send(user);
  } catch {
    res.status(404);
    res.send({ error: "User not found" });
  }
});

// get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    if (!users) throw new Error();
    res.send(users);
  } catch {
    res.status(404);
    res.send({ error: "UNo users found" });
  }
});

// create a post
router.post("/posts/create", async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.send(post);
  } catch {
    res.status(500);
    res.send({ error: "post not saved!" });
  }
});

//create a user
router.post("/users/create", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.send(user);
  } catch {
    res.status(500);
    res.send({ error: "User not saved!" });
  }
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
//update a user
router.patch("/users/update/:id", async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id });

    if (req.body.username) user.username = req.body.username;
    if (req.body.imageUrl) user.imageUrl = req.body.imageUrl;
    user.date = Date.now();

    await user.save();
    res.send(user);
  } catch {
    res.status(404);
    res.send({ error: "User not found" });
  }
});

// delete post
router.delete("/posts/delete/:id", async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    res.send("Deleted post id:" + req.params.id);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});
// delete user
router.delete("/users/delete/:id", async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.send("Deleted user id:" + req.params.id);
  } catch {
    res.status(404);
    res.send({ error: "User doesn't exist!" });
  }
});

module.exports = router;
