import axiosInstance from "../axios/axios";
import { deleteVideoFile, uploadVideoInChunks } from "./videos/videos.api";

export const getAllConditioningsApi = async () => {
  try {
    const response = await axiosInstance.get("/api/conditionings/get");
    return response;
  } catch (error) {
    console.error("Error fetching all conditionings:", error);
    throw error;
  }
};

export const createConditioningApi = async (formData) => {
  const warmUpVideoPath = await uploadVideoInChunks(
    formData.warmUpVideo,
    "warmUpVideo"
  );

  // Upload cooldown video in chunks
  const cooldownVideoPath = await uploadVideoInChunks(
    formData.cooldownVideo,
    "cooldownVideo"
  );

  // Send final request to create conditioning with video paths
  const conditioningData = {
    warmUpVideoUrl: warmUpVideoPath,
    warmUpVideoReference: formData.warmUpVideoReference,
    cooldownVideoUrl: cooldownVideoPath,
    cooldownVideoReference: formData.cooldownVideoReference,
  };

  try {
    const response = await axiosInstance.post(
      "/api/conditionings/create",
      conditioningData
    );
    return response;
  } catch (error) {
    console.error("Error creating conditioning:", error);
    throw error;
  }
};

export const updateConditioningApi = async (id, formData, conditioning) => {
  let warmUpVideoUrl = conditioning.warmUpVideoUrl;
  let cooldownVideoUrl = conditioning.cooldownVideoUrl;

  if (formData.warmUpVideo instanceof File) {
    const response = await deleteVideoFile(conditioning.warmUpVideoUrl);

    if (response.data.success) {
      warmUpVideoUrl = await uploadVideoInChunks(
        formData.warmUpVideo,
        "warmUpVideo"
      );
    }
  }

  if (formData.cooldownVideo instanceof File) {
    const response = await deleteVideoFile(conditioning.cooldownVideoUrl);
    if (response.data.success) {
      cooldownVideoUrl = await uploadVideoInChunks(
        formData.cooldownVideo,
        "cooldownVideo"
      );
    }
  }

  const updatedConditioningVideos = {
    warmUpVideoUrl,
    warmUpVideoReference: formData.warmUpVideoReference,
    cooldownVideoUrl: cooldownVideoUrl,
    cooldownVideoReference: formData.cooldownVideoReference,
  };

  try {
    const response = await axiosInstance.put(
      `/api/conditionings/update/${id}`,
      updatedConditioningVideos
    );
    return response;
  } catch (error) {
    console.error("Error updating conditioning:", error);
    throw error;
  }
};

export const deleteConditioningApi = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/api/conditionings/delete/${id}`
    );
    return response;
  } catch (error) {
    console.error("Error deleting conditioning:", error);
    throw error;
  }
};
