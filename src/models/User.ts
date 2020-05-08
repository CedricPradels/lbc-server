import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  hash: { type: String, required: true },
  token: { type: String, required: true },
  salt: { type: String, required: true },
  alias: { type: String },
});

export default mongoose.model("User", userSchema);
