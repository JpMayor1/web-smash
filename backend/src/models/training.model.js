import mongoose from "mongoose";

const DrillSchema = new mongoose.Schema({
  drillName: { type: String, required: true },
  whatToDo: { type: String, required: true },
  howToDoIt: [{ type: String, required: true }],
  focus: { type: String, required: true },
  repetitions: { type: String, required: true },
  trainingVideoUrl: { type: String, required: false },
  videoReference: { type: String, required: true },
  finishedUsers: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      finishedUserVideoUrl: { type: String },
      feedback: { type: String },
    },
  ],
});

const trainingSchema = new mongoose.Schema(
  {
    day: { type: Number, required: true },
    title: { type: String, required: true },
    drills: [DrillSchema],
    gender: { type: String, enum: ["male", "female"], required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Training", trainingSchema);
