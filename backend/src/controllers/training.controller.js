import Training from "../models/training.model.js";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

export const getAllTrainings = async (req, res) => {
  try {
    const trainings = await Training.find();
    return res.status(200).json(trainings);
  } catch (error) {
    console.error("Error fetching trainings:", error);
    return res.status(500).json({
      message: "Failed to fetch trainings",
      error: error.message,
    });
  }
};

export const getTrainingById = async (req, res) => {
  const { id } = req.params;

  try {
    const training = await Training.findById(id);
    if (!training) {
      return res.status(404).json({ message: "Training not found" });
    }
    return res.status(200).json(training);
  } catch (error) {
    console.error("Error fetching training by ID:", error);
    return res.status(500).json({
      message: "Failed to fetch training",
      error: error.message,
    });
  }
};

export const createTraining = async (req, res) => {
  const { day, title, drills, gender } = req.body;

  try {
    const drillArray = Array.isArray(drills) ? drills : [drills];

    const updatedDrills = drillArray.map((drill, index) => {
      const videoFieldName = drill.trainingVideo;

      const videoFile = req.files.find(
        (file) => file.originalname === videoFieldName
      );

      const trainingVideoUrl = videoFile ? videoFile.filename : "";

      return {
        ...drill,
        trainingVideoUrl,
      };
    });

    const newTraining = new Training({
      day,
      title,
      drills: updatedDrills,
      gender,
    });

    await newTraining.save();

    return res.status(201).json({
      message: "Training created successfully!",
      training: newTraining,
    });
  } catch (error) {
    console.error("Error creating training:", error);
    return res.status(500).json({
      message: "Failed to create training",
      error: error.message,
    });
  }
};

export const updateTraining = async (req, res) => {
  const { id } = req.params;
  const { day, title, drills, gender } = req.body;

  try {
    const training = await Training.findById(id);
    if (!training) {
      return res.status(404).json({ message: "Training not found" });
    }

    training.day = day;
    training.title = title;
    training.gender = gender;

    const files = req.files || [];

    const drillArray = Array.isArray(drills) ? drills : [drills];

    const updatedDrills = drillArray.map((drill, index) => {
      const videoFile = files.find(
        (file) => file.originalname === drill.trainingVideo
      );
      const trainingVideoUrl = videoFile
        ? videoFile.filename
        : drill.trainingVideoUrl;

      if (videoFile && drill.trainingVideoUrl) {
        const oldVideoPath = path.join("public/videos", drill.trainingVideoUrl);
        fs.unlink(oldVideoPath, (err) => {
          if (err) {
            console.error(`Failed to delete old video: ${oldVideoPath}`, err);
          }
        });
      }

      return {
        ...drill,
        trainingVideoUrl,
      };
    });

    training.drills = updatedDrills;

    await training.save();

    return res.status(200).json({
      message: "Training updated successfully!",
      training,
    });
  } catch (error) {
    console.error("Error updating training:", error);
    return res.status(500).json({
      message: "Failed to update training",
      error: error.message,
    });
  }
};

export const deleteTraining = async (req, res) => {
  const { id } = req.params;

  try {
    const training = await Training.findById(id);
    if (!training) {
      return res.status(404).json({ message: "Training not found" });
    }

    training.drills.forEach((d) => {
      if (d.trainingVideoUrl) {
        const videoPath = path.join("public/videos", d.trainingVideoUrl);
        fs.unlink(videoPath, (err) => {
          if (err) console.error(`Failed to delete video: ${videoPath}`, err);
        });
      }
    });

    await Training.findByIdAndDelete(id);

    return res.status(200).json({ message: "Training deleted successfully!" });
  } catch (error) {
    console.error("Error deleting training:", error);
    return res.status(500).json({
      message: "Failed to delete training",
      error: error.message,
    });
  }
};
