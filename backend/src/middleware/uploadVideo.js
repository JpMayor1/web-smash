import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.VIDEO_UPLOAD_PATH);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

export const uploadVideoChunk = multer({ storage }).fields([
  { name: "warmUpVideo", maxCount: 1 },
  { name: "cooldownVideo", maxCount: 1 },
  { name: "trainingVideo0", maxCount: 1 },
  { name: "trainingVideo1", maxCount: 1 },
  { name: "trainingVideo2", maxCount: 1 },
  { name: "trainingVideo3", maxCount: 1 },
  { name: "trainingVideo4", maxCount: 1 },
  { name: "trainingVideo5", maxCount: 1 },
  { name: "trainingVideo6", maxCount: 1 },
  { name: "trainingVideo7", maxCount: 1 },
  { name: "trainingVideo8", maxCount: 1 },
  { name: "trainingVideo9", maxCount: 1 },
  { name: "trainingVideo10", maxCount: 1 },
  { name: "finishedUserVideoUrl", maxCount: 1 },
]);
