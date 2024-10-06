import mongoose from "mongoose";

const trainingSchema = new mongoose.Schema(
  {
    day: { type: Number, required: true },
    title: { type: String, required: true },
    descriptions: [{ type: String, required: true }],
    trainingVideoUrl: { type: String },
    finishedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default mongoose.model("Training", trainingSchema);
