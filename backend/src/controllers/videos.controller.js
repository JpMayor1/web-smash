import fs from "fs";
import path from "path";

const VIDEOS_PATH = process.env.VIDEO_UPLOAD_PATH || "public/videos";

export const uploadChunk = (req, res) => {
  try {
    const { dzchunkindex, dzfilename } = req.body;
    const chunkIndex = parseInt(dzchunkindex);
    const chunkFiles = req.files;

    if (!chunkFiles || !Object.keys(chunkFiles).length) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    Object.keys(chunkFiles).forEach((fieldname) => {
      const chunkFile = chunkFiles[fieldname][0];

      const tempDir = path.join(VIDEOS_PATH, dzfilename);

      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }

      const chunkPath = path.join(
        tempDir,
        `${fieldname}-${chunkIndex}${path.extname(chunkFile.originalname)}`
      );

      fs.renameSync(chunkFile.path, chunkPath);
    });

    res.status(200).json({ message: "Chunks uploaded successfully" });
  } catch (error) {
    console.error("Error uploading chunk:", error);
    res.status(500).json({ message: "Server error while uploading chunks" });
  }
};

// Merge all chunks when finished
export const mergeChunks = async (req, res) => {
  const { dzfilename, dzfieldname, dztotalchunkcount } = req.body;
  const totalChunks = parseInt(dztotalchunkcount);
  const tempDir = path.join(VIDEOS_PATH, dzfilename);

  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  const finalFileName = `${
    dzfieldname || "video"
  }-${uniqueSuffix}${path.extname(dzfilename)}`;
  const finalFilePath = path.join(VIDEOS_PATH, finalFileName);

  try {
    const writeStream = fs.createWriteStream(finalFilePath);

    for (let i = 0; i < totalChunks; i++) {
      const chunkPath = path.join(tempDir, `${dzfieldname}-${i}`);
      const chunk = fs.readFileSync(chunkPath);
      writeStream.write(chunk);
      fs.unlinkSync(chunkPath);
    }

    writeStream.end();

    fs.rmdirSync(tempDir);

    res.status(200).json({ videoPath: finalFileName });
  } catch (error) {
    console.error("Error merging chunks:", error);
    res.status(500).json({ message: "Error merging video chunks" });
  }
};

export const deleteVideoFile = (req, res) => {
  const { filename } = req.params;
  const videoPath = path.join(VIDEOS_PATH, filename);

  fs.exists(videoPath, (exists) => {
    if (!exists) {
      return res
        .status(404)
        .json({ message: "File not found", success: false });
    }

    fs.unlink(videoPath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
        return res
          .status(500)
          .json({ message: "Error deleting file", success: false });
      }

      res
        .status(200)
        .json({ message: "File deleted successfully", success: true });
    });
  });
};
