const mongoose = require("mongoose");

const schema = mongoose.Schema({
  username: String,
  imageUrl: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", schema);
