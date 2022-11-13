const mongoose = require("mongoose");

const schema = mongoose.Schema({
  userId: String,
  content: String,
  date: { type: Date, default: Date.now },
  isReply: { type: Boolean, default: false },
  repliedToId: String,
  votes: { type: Number, default: 0 },
});

module.exports = mongoose.model("Post", schema);
