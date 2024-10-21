import express from "express";
import {
  createTraining,
  getAllTrainings,
  getTrainingById,
  updateTraining,
  deleteTraining,
  finishDrill,
  addFeedback,
} from "../controllers/training.controller.js";
import { uploadVideo } from "../middleware/uploadVideo.js";
import userProtectRoute from "../middleware/user.protected.route.js";

const router = express.Router();

router.post("/create", uploadVideo, createTraining);
router.get("/getAll", getAllTrainings);
router.get("/getById/:id", getTrainingById);
router.put("/update/:id", uploadVideo, updateTraining);
router.delete("/delete/:id", deleteTraining);
router.put(
  "/finish-drill/:trainingId/:drillId",
  userProtectRoute,
  uploadVideo,
  finishDrill
);
router.put("/addFeedback/:trainingId/:drillId/:userId", addFeedback);

export default router;
