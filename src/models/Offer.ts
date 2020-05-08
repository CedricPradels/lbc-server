import mongoose, { Schema, Document, Types } from "mongoose";

interface IOffer extends Document {
  title: string;
  price: number;
  date: Date;
  description: string;
  pictures: string[];
  dealer: Types.ObjectId;
}

const OfferSchema: Schema = new mongoose.Schema({
  title: String,
  price: Number,
  date: Date,
  description: String,
  pictures: [String],
  dealer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model<IOffer>("Offer", OfferSchema);
