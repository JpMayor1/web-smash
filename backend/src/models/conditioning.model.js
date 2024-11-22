import mongoose from "mongoose";

const conditioningSchema = new mongoose.Schema(
  {
    warmUpVideoUrl: { type: String, required: true },
    warmUpVideoReference: { type: String, required: true },
    cooldownVideoUrl: { type: String, required: true },
    cooldownVideoReference: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Conditioning", conditioningSchema);
