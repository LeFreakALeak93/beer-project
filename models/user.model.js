const { Schema, model } = require("mongoose")

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  }
})
const User = model("User", userSchema);
module.exports = User;