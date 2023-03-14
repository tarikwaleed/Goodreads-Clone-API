const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["normal", "admin"], default: "normal" },
  token: { type: String, },
});

module.exports = mongoose.model("User", UserSchema);
