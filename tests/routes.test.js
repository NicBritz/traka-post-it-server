const app = require("../server");
const mongoose = require("mongoose");
const supertest = require("supertest");
const Post = require("../models/Post");
const User = require("../models/User");

// connect to a local database before each test
beforeEach((done) => {
  mongoose.connect(
    "mongodb://localhost:27017/JestDB",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done()
  );
});

//close connection after each test and delete and collections
afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});

test("GET /api/posts", async () => {
  const post = await Post.create({
    userId: "6371037dd00d55f391b15b0fd",
    content: "Lorem ipsum",
    isReply: true,
    repliedToId: "6371037klj0d55f391b15b0fd",
    votes: 150,
  });

  await supertest(app)
    .get("/api/posts")
    .expect(200)
    .then((response) => {
      // checking data length
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toEqual(1);

      //checking data
      expect(response.body[0]._id).toBe(post.id);
      expect(response.body[0].userId).toBe(post.userId);
      expect(response.body[0].content).toBe(post.content);
      expect(response.body[0].isReply).toBe(post.isReply);
      expect(response.body[0].repliedToId).toBe(post.repliedToId);
      expect(response.body[0].votes).toBe(post.votes);
    });
});

test("GET /api/users", async () => {
  const user = await User.create({
    username: "User",
    imageUrl: "https://some_image",
  });

  await supertest(app)
    .get("/api/users")
    .expect(200)
    .then((response) => {
      // check data length
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toEqual(1);

      //checking data
      expect(response.body[0]._id).toBe(user.id);
      expect(response.body[0].username).toBe(user.username);
      expect(response.body[0].imageUrl).toBe(user.imageUrl);
    });
});

test("GET /api/posts/:id", async () => {
  const post = await Post.create({
    userId: "6371037dd00d55f391b15b0fd",
    content: "Lorem ipsum",
    isReply: true,
    repliedToId: "6371037klj0d55f391b15b0fd",
    votes: 150,
  });

  await supertest(app)
    .get(`/api/posts/${post.id}`)
    .expect(200)
    .then((response) => {
      // checking data
      expect(response.body._id).toBe(post.id);
      expect(response.body.userId).toBe(post.userId);
      expect(response.body.content).toBe(post.content);
      expect(response.body.isReply).toBe(post.isReply);
      expect(response.body.repliedToId).toBe(post.repliedToId);
      expect(response.body.votes).toBe(post.votes);
    });
});

test("GET /api/users/:id", async () => {
  const user = await User.create({
    username: "User",
    imageUrl: "https://some_image",
  });

  await supertest(app)
    .get(`/api/users/${user.id}`)
    .expect(200)
    .then((response) => {
      // checking data
      expect(response.body._id).toBe(user.id);
      expect(response.body.username).toBe(user.username);
      expect(response.body.imageUrl).toBe(user.imageUrl);
    });
});

test("POST /api/posts/create", async () => {
  const data = {
    userId: "6371037dd00d55f391b15b0fd",
    content: "Lorem ipsum",
    isReply: true,
    repliedToId: "6371037klj0d55f391b15b0fd",
    votes: 150,
  };

  await supertest(app)
    .post("/api/posts/create")
    .send(data)
    .expect(200)
    .then(async (response) => {
      // check the response
      expect(response.body._id).toBeTruthy();
      expect(response.body.userId).toBe(data.userId);
      expect(response.body.content).toBe(data.content);
      expect(response.body.isReply).toBe(data.isReply);
      expect(response.body.repliedToId).toBe(data.repliedToId);
      expect(response.body.votes).toBe(data.votes);

      //check database
      const post = await Post.findById({ _id: response.body._id });
      expect(post).toBeTruthy();
      expect(post.userId).toBe(data.userId);
      expect(post.content).toBe(data.content);
      expect(post.isReply).toBe(data.isReply);
      expect(post.repliedToId).toBe(data.repliedToId);
      expect(post.votes).toBe(data.votes);
    });
});

test("POST /api/users/create", async () => {
  const data = {
    username: "User",
    imageUrl: "https://some_image",
  };

  await supertest(app)
    .post("/api/users/create")
    .send(data)
    .expect(200)
    .then(async (response) => {
      // check the response
      expect(response.body._id).toBeTruthy();
      expect(response.body.username).toBe(data.username);
      expect(response.body.imageUrl).toBe(data.imageUrl);

      //check database
      const user = await User.findById({ _id: response.body._id });
      expect(user).toBeTruthy();
      expect(user.username).toBe(data.username);
      expect(user.imageUrl).toBe(data.imageUrl);
    });
});
