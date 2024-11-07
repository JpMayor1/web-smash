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

  if (!day || !title || !drills || !gender) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  try {
    const newTraining = new Training({
      day,
      title,
      drills,
      gender,
    });

    await newTraining.save();

    if (!newTraining) {
      return res.status(400).json({ message: "Failed to create training" });
    }

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
    training.drills = drills;

    await training.save();

    if (!training) {
      return res.status(400).json({ message: "Failed to update training" });
    }

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
        const videoPath = path.join(
          process.env.VIDEO_UPLOAD_PATH,
          d.trainingVideoUrl
        );
        console.log("drill videoPath", videoPath);
        fs.unlink(videoPath, (err) => {
          if (err) console.error(`Failed to delete video: ${videoPath}`, err);
        });
      }

      if (d.finishedUsers.length > 0) {
        d.finishedUsers.forEach((fu) => {
          if (fu.finishedUserVideoUrl) {
            const videoPath = path.join(
              process.env.VIDEO_UPLOAD_PATH,
              fu.finishedUserVideoUrl
            );
            console.log("finishedUsers videoPath", videoPath);
            fs.unlink(videoPath, (err) => {
              if (err)
                console.error(`Failed to delete video: ${videoPath}`, err);
            });
          }
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

export const finishDrill = async (req, res) => {
  const { finishedUserVideoUrl } = req.body;
  const { trainingId, drillId } = req.params;
  const userId = req.user._id;

  try {
    // Find the training by its ID
    const training = await Training.findById(trainingId);

    if (!training) {
      return res.status(404).json({ error: "Training not found." });
    }

    // Find the drill within the training by its ID
    const drill = training.drills.id(drillId);
    if (!drill) {
      return res.status(404).json({ error: "Drill not found." });
    }

    // Check if the user already finished the drill
    const alreadyFinished = drill.finishedUsers.some(
      (finishedUser) => finishedUser.userId.toString() === userId
    );

    if (alreadyFinished) {
      return res
        .status(400)
        .json({ error: "User has already finished this drill." });
    }

    drill.finishedUsers.push({
      userId,
      finishedUserVideoUrl,
    });

    await training.save();

    if (!training) {
      return res.status(400).json({ error: "Failed to finish drill." });
    }

    return res
      .status(200)
      .json({ message: "Drill marked as finished successfully.", training });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error." });
  }
};

export const addFeedback = async (req, res) => {
  const { feedback } = req.body;
  const { trainingId, drillId, userId } = req.params;

  try {
    const training = await Training.findById(trainingId);

    if (!training) {
      return res.status(404).json({ error: "Training not found." });
    }

    const drill = training.drills.id(drillId);
    if (!drill) {
      return res.status(404).json({ error: "Drill not found." });
    }

    const finishedUser = drill.finishedUsers.find(
      (finishedUser) => finishedUser.userId.toString() === userId
    );

    if (!finishedUser) {
      return res
        .status(404)
        .json({ error: "User has not finished this drill." });
    }

    finishedUser.feedback = feedback;

    await training.save();

    return res
      .status(200)
      .json({ message: "Feedback added successfully.", training });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error." });
  }
};
