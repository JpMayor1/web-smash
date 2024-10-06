import Training from "../models/training.model.js";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

export const createTraining = async (req, res) => {
  const { day, title, descriptions } = req.body;

  const trainingVideoUrl = req.trainingVideoUrl || null;

  try {
    const newTraining = new Training({
      day,
      title,
      descriptions,
      trainingVideoUrl,
    });

    await newTraining.save();
    res.status(201).json(newTraining);
  } catch (error) {
    res.status(500).json({ message: "Error creating training", error });
  }
};

export const getAllTrainings = async (req, res) => {
  try {
    const trainings = await Training.find();
    res.status(200).json(trainings);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving trainings", error });
  }
};

export const getTrainingById = async (req, res) => {
  const { id } = req.params;

  try {
    const training = await Training.findById(id);

    if (!training) {
      return res.status(404).json({ message: "Training not found" });
    }

    res.status(200).json(training);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving training", error });
  }
};

export const updateTraining = async (req, res) => {
  const { id } = req.params;
  const { day, title, descriptions } = req.body;

  try {
    const training = await Training.findById(id);

    if (!training) {
      return res.status(404).json({ message: "Training not found" });
    }

    if (day) training.day = day;
    if (title) training.title = title;

    if (Array.isArray(descriptions)) {
      training.descriptions = descriptions;
    } else if (descriptions) {
      training.descriptions.push(descriptions);
    }

    if (req.trainingVideoUrl) {
      const currentVideoFilePath = path.join(
        process.cwd(),
        "public/videos",
        training.trainingVideoUrl
      );

      fs.unlink(currentVideoFilePath, (err) => {
        if (err) {
          console.error("Error deleting video file:", err);
        }
      });

      training.trainingVideoUrl = req.trainingVideoUrl;
    }

    const updatedTraining = await training.save();
    res.status(200).json({
      message: "Training updated successfully",
      training: updatedTraining,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating training", error });
  }
};

export const deleteTraining = async (req, res) => {
  try {
    const trainingId = req.params.id;

    const training = await Training.findById(trainingId);
    if (!training) {
      return res.status(404).json({ message: "Training not found" });
    }

    const videoFilePath = path.join(
      process.cwd(),
      "public/videos",
      training.trainingVideoUrl
    );

    await Training.findByIdAndDelete(trainingId);

    fs.unlink(videoFilePath, (err) => {
      if (err) {
        console.error("Error deleting video file:", err);
      }
    });

    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting training:", error);
    return res.status(500).json({ message: "Error deleting training", error });
  }
};
