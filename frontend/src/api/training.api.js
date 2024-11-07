import axiosInstance from "../axios/axios";
import { deleteVideoFile, uploadVideoInChunks } from "./videos/videos.api";

// Get all trainings
export const getAllTrainingApi = async () => {
  try {
    const response = await axiosInstance.get("/api/trainings/getAll");
    return response;
  } catch (error) {
    console.error("Error fetching all trainings:", error);
    throw error;
  }
};

// Get training by ID
export const getTrainingByIdApi = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/trainings/getById/${id}`);
    return response;
  } catch (error) {
    console.error(`Error fetching training with ID ${id}:`, error);
    throw error;
  }
};

// Create a new training with a video file
export const createTrainingApi = async (formData) => {
  const data = new FormData();

  // Append basic fields
  data.append("day", formData.day);
  data.append("title", formData.title);
  data.append("gender", formData.gender);

  for (const [index, drill] of formData.drills.entries()) {
    data.append(`drills[${index}][drillName]`, drill.drillName || "N/A");
    data.append(`drills[${index}][whatToDo]`, drill.whatToDo || "N/A");
    data.append(`drills[${index}][focus]`, drill.focus || "N/A");
    data.append(`drills[${index}][repetitions]`, drill.repetitions || "N/A");

    drill.howToDoIt.forEach((howToDo, howIndex) => {
      data.append(`drills[${index}][howToDoIt][${howIndex}]`, howToDo || "");
    });

    data.append(
      `drills[${index}][videoReference]`,
      drill.videoReference || "N/A"
    );

    if (drill.trainingVideo instanceof File) {
      try {
        const trainingVideoUrl = await uploadVideoInChunks(
          drill.trainingVideo,
          `trainingVideo${index}`
        );

        data.append(
          `drills[${index}][trainingVideoUrl]`,
          trainingVideoUrl || "N/A"
        );
      } catch (error) {
        console.error(`Error uploading video for drill ${index}:`, error);
        throw error;
      }
    } else {
      data.append(`drills[${index}][trainingVideoUrl]`, "N/A");
    }
  }

  try {
    const response = await axiosInstance.post("/api/trainings/create", data);
    return response;
  } catch (error) {
    console.error("Error creating new training:", error);
    throw error;
  }
};

// Update an existing training by ID
export const updateTrainingApi = async (id, formData) => {
  const data = new FormData();

  // Append basic fields
  data.append("day", formData.day);
  data.append("title", formData.title);
  data.append("gender", formData.gender);

  // Process each drill asynchronously
  for (const [index, drill] of formData.drills.entries()) {
    // Append each drill's fields
    data.append(`drills[${index}][drillName]`, drill.drillName || "");
    data.append(`drills[${index}][whatToDo]`, drill.whatToDo || "");
    data.append(`drills[${index}][focus]`, drill.focus || "");
    data.append(`drills[${index}][repetitions]`, drill.repetitions || "");

    // Append each "how to do it" item within the drill
    drill.howToDoIt.forEach((howToDo, howIndex) => {
      data.append(`drills[${index}][howToDoIt][${howIndex}]`, howToDo || "");
    });

    // Append the original name of the video (if it exists) or upload a new one
    if (drill.trainingVideo instanceof File) {
      try {
        // Delete the old video file if it exists
        if (drill.trainingVideoUrl) {
          const response = await deleteVideoFile(drill.trainingVideoUrl);
          if (!response.data.success) {
            throw new Error(`Failed to delete video ${drill.trainingVideoUrl}`);
          }
        }

        // Upload new video in chunks and get the uploaded video URL
        const trainingVideoUrl = await uploadVideoInChunks(
          drill.trainingVideo,
          `trainingVideo${index}`
        );

        // Append the new video URL to the form data
        data.append(
          `drills[${index}][trainingVideoUrl]`,
          trainingVideoUrl || "N/A"
        );
      } catch (error) {
        console.error(`Error uploading video for drill ${index}:`, error);
        throw error;
      }
    } else {
      // If no new video, keep the existing video URL
      data.append(
        `drills[${index}][trainingVideoUrl]`,
        drill.trainingVideoUrl || "N/A"
      );
    }

    // Append video reference
    data.append(
      `drills[${index}][videoReference]`,
      drill.videoReference || "N/A"
    );
  }

  try {
    const response = await axiosInstance.put(
      `/api/trainings/update/${id}`,
      data
    );
    return response;
  } catch (error) {
    console.error(`Error updating training with ID ${id}:`, error);
    throw error;
  }
};

// Delete a training by ID
export const deleteTrainingApi = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/trainings/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting training with ID ${id}:`, error);
    throw error;
  }
};

export const finishDrillApi = async (trainingId, drillId, file) => {
  const data = new FormData();

  if (file instanceof File) {
    try {
      const finishedUserVideoUrl = await uploadVideoInChunks(
        file,
        `finishedUserVideoUrl`
      );

      data.append("finishedUserVideoUrl", finishedUserVideoUrl);
    } catch (error) {
      console.error("Error uploading finished user video:", error);
      throw error;
    }
  }

  try {
    const response = await axiosInstance.put(
      `/api/trainings/finish-drill/${trainingId}/${drillId}`,
      data
    );
    return response;
  } catch (error) {
    console.error(`Error finishing drill with ID ${drillId}:`, error);
    throw error;
  }
};

export const addFeddbackApi = async (trainingId, drillId, userId, feedback) => {
  try {
    const response = await axiosInstance.put(
      `/api/trainings/addFeedback/${trainingId}/${drillId}/${userId}`,
      { feedback }
    );
    return response;
  } catch (error) {
    console.error("Error adding feedback:", error);
    throw error;
  }
};
