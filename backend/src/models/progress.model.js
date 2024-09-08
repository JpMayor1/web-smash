import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    training: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Training",
      required: true,
    },
    status: {
      type: String,
      enum: ["Finished", "Unfinished"],
      default: "Unfinished",
    },
    completionDate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Progress", progressSchema);
