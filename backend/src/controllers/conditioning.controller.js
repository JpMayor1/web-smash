import Conditioning from "../models/conditioning.model.js";
import fs from "fs";
import path from "path";

export const getAllConditionings = async (req, res) => {
  try {
    const conditionings = await Conditioning.find();
    return res.status(200).json(conditionings);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const createConditioning = async (req, res) => {
  const { warmUpVideoUrl, cooldownVideoUrl } = req.body;
  const files = req.files;

  try {
    const warmUpVideoFile = files.find(
      (file) => file.originalname === warmUpVideoUrl
    );

    const coolDownVideoFile = files.find(
      (file) => file.originalname === cooldownVideoUrl
    );

    const warmUpVideoFileUrl = warmUpVideoFile.filename || "";
    const coolDownVideoFileUrl = coolDownVideoFile.filename || "";

    const newConditioning = new Conditioning({
      warmUpVideoUrl: warmUpVideoFileUrl,
      cooldownVideoUrl: coolDownVideoFileUrl,
    });

    await newConditioning.save();

    return res.status(201).json(newConditioning);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const updateConditioning = async (req, res) => {
  const { id } = req.params;
  const { warmUpVideoUrl, cooldownVideoUrl } = req.body;
  const files = req.files;

  try {
    const conditioning = await Conditioning.findById(id);

    if (!conditioning) {
      return res.status(404).json({ message: "Conditioning not found" });
    }

    let warmUpVideoFileUrl = conditioning.warmUpVideoUrl;
    let cooldownVideoFileUrl = conditioning.cooldownVideoUrl;

    if (files) {
      const warmUpVideoFile = files.find(
        (file) => file.originalname === warmUpVideoUrl
      );
      const cooldownVideoFile = files.find(
        (file) => file.originalname === cooldownVideoUrl
      );

      if (warmUpVideoFile) {
        warmUpVideoFileUrl = warmUpVideoFile.filename;
      }

      if (cooldownVideoFile) {
        cooldownVideoFileUrl = cooldownVideoFile.filename;
      }
    }

    const updatedConditioning = await Conditioning.findByIdAndUpdate(
      id,
      {
        warmUpVideoUrl: warmUpVideoFileUrl,
        cooldownVideoUrl: cooldownVideoFileUrl,
      },
      { new: true }
    );

    return res.status(200).json(updatedConditioning);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const deleteConditioning = async (req, res) => {
  const { id } = req.params;

  try {
    const conditioning = await Conditioning.findById(id);
    if (!conditioning) {
      return res.status(404).json({ message: "Conditioning not found" });
    }

    // Assuming you have properties `warmUpVideoUrl` and `cooldownVideoUrl` in your Conditioning model
    const { warmUpVideoUrl, cooldownVideoUrl } = conditioning;

    // Delete warm-up video if it exists
    if (warmUpVideoUrl) {
      const warmUpVideoPath = path.join("public/videos", warmUpVideoUrl);
      fs.unlink(warmUpVideoPath, (err) => {
        if (err)
          console.error(
            `Failed to delete warm-up video: ${warmUpVideoPath}`,
            err
          );
      });
    }

    // Delete cool-down video if it exists
    if (cooldownVideoUrl) {
      const cooldownVideoPath = path.join("public/videos", cooldownVideoUrl);
      fs.unlink(cooldownVideoPath, (err) => {
        if (err)
          console.error(
            `Failed to delete cool-down video: ${cooldownVideoPath}`,
            err
          );
      });
    }

    await Conditioning.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ message: "Conditioning deleted successfully!" });
  } catch (error) {
    console.error("Error deleting conditioning:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};
