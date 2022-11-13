const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
// app.use(require("./routes/posts"));

// connect to the database
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// connected db
const db = mongoose.connection;

db.on("connected", () => {
  app.listen(PORT, () => {
    //successful database connection
    console.log("Connected to mongo database and serving on port:" + PORT);
  });
});

// binding connection error
db.on("error", console.error.bind(console, "MongoDB connection error:"));
