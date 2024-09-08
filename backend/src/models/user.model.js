import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gradeLevel: { type: Number, required: true },
    section: { type: String, required: true },
    progress: [
      {
        training: { type: mongoose.Schema.Types.ObjectId, ref: "Training" },
        status: {
          type: String,
          enum: ["Finished", "Unfinished"],
          default: "Unfinished",
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
