import express from "express";
import {
  createTraining,
  getAllTrainings,
  getTrainingById,
  updateTraining,
  deleteTraining,
} from "../controllers/training.controller.js";
import uploadVideo from "../utils/fileUpload.js";

const router = express.Router();

router.post("/create", uploadVideo, createTraining);
router.get("/getAll", getAllTrainings);
router.get("/getById/:id", getTrainingById);
router.put("/update/:id", uploadVideo, updateTraining);
router.delete("/delete/:id", deleteTraining);

export default router;
