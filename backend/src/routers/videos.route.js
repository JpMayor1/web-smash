import express from "express";
import {
  uploadChunk,
  mergeChunks,
  deleteVideoFile,
} from "../controllers/videos.controller.js";
import { uploadVideoChunk } from "../middleware/uploadVideo.js";

const router = express.Router();

router.post("/upload", uploadVideoChunk, uploadChunk);
router.post("/merge", mergeChunks);
router.delete("/delete/:filename", deleteVideoFile);

export default router;
