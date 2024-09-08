import mongoose from "mongoose";

const trainingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    week: { type: Number, required: true },
    exercises: [{ type: String }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Training", trainingSchema);
