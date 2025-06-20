const mongoose = require("mongoose");
const uid2 = require("uid2");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  token: {
    type: String,
    default: () => uid2(32)
  }
});

module.exports = mongoose.model("User", userSchema);
