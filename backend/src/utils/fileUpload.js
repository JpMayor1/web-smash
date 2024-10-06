import multer from "multer";
import path from "path";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs";

ffmpeg.setFfmpegPath(process.env.FFMPEG_PATH);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), "public/videos"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const sanitizedFileName = file.originalname.replace(/\s+/g, "-");
    const newFileName = `${uniqueSuffix}-${
      path.parse(sanitizedFileName).name
    }.mp4`;
    cb(null, newFileName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("video/")) {
    cb(null, true);
  } else {
    cb(new Error("Only video files are allowed!"), false);
  }
};

const uploadVideo = (req, res, next) => {
  const upload = multer({ storage, fileFilter }).single("trainingVideo");

  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return next();
    }

    const inputFilePath = req.file.path;
    const outputFilePath = path.join(
      path.dirname(inputFilePath),
      `${path.parse(req.file.filename).name}-converted.mp4`
    );

    ffmpeg(inputFilePath)
      .toFormat("mp4")
      .on("end", () => {
        fs.unlink(inputFilePath, (unlinkErr) => {
          if (unlinkErr) {
            console.error("Error deleting original file:", unlinkErr);
          }
        });

        req.trainingVideoUrl = path.basename(outputFilePath);

        next();
      })
      .on("error", (conversionError) => {
        return res.status(500).json({
          error: "Error during video conversion: " + conversionError.message,
        });
      })
      .save(outputFilePath);
  });
};

export default uploadVideo;
