const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

if (process.env.PRODUCTION) {
  // connect to the database
  mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} else {
  mongoose.connect("mongodb://localhost:27017/JestDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

// connected db
const db = mongoose.connection;

db.on("connected", () => {
  // add all routes
  app.use("/api", routes);
});

// binding connection error
db.on("error", console.error.bind(console, "MongoDB connection error:"));
module.exports = app;
