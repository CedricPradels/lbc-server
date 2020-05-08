import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  email: string;
  hash: string;
  token: string;
  salt: string;
  alias: string;
}

const UserSchema: Schema = new mongoose.Schema({
  email: { type: String, required: true },
  hash: { type: String, required: true },
  token: { type: String, required: true },
  salt: { type: String, required: true },
  alias: { type: String },
});

export default mongoose.model<IUser>("User", UserSchema);
