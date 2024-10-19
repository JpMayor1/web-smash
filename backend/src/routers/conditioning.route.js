import express from "express";
import {
  createConditioning,
  getAllConditionings,
  updateConditioning,
  deleteConditioning,
} from "../controllers/conditioning.controller.js";
import { uploadVideo } from "../middleware/uploadVideo.js";

const router = express.Router();

router.get("/get", getAllConditionings);

router.post("/create", uploadVideo, createConditioning);

router.put("/update/:id", uploadVideo, updateConditioning);

router.delete("/delete/:id", deleteConditioning);

export default router;
