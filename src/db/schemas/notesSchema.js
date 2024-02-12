import mongoose from "mongoose";

const schema = {
  title: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null },
};

const mongooseModel = new mongoose.model("Notes", schema);
export default mongooseModel;