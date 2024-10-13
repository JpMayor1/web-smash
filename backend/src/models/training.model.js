import mongoose from "mongoose";

const DrillSchema = new mongoose.Schema({
  drillName: { type: String, required: true },
  whatToDo: { type: String, required: true },
  howToDoIt: [{ type: String, required: true }],
  focus: { type: String, required: true },
  repetitions: { type: String, required: true },
  trainingVideoUrl: { type: String, required: true },
  videoReference: { type: String, required: true },
});

const trainingSchema = new mongoose.Schema(
  {
    day: { type: Number, required: true },
    title: { type: String, required: true },
    drill: [DrillSchema],
    gender: { type: String, enum: ["male", "female"], required: true },
    finishedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default mongoose.model("Training", trainingSchema);
