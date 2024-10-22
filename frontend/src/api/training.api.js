import axiosInstance from "../axios/axios";

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

  // Append drills
  formData.drills.forEach((drill, index) => {
    // Append each drill's fields
    data.append(`drills[${index}][drillName]`, drill.drillName || "N/A");
    data.append(`drills[${index}][whatToDo]`, drill.whatToDo || "N/A");
    data.append(`drills[${index}][focus]`, drill.focus || "N/A");
    data.append(`drills[${index}][repetitions]`, drill.repetitions || "N/A");

    // Append each "how to do it" item within the drill
    drill.howToDoIt.forEach((howToDo, howIndex) => {
      data.append(`drills[${index}][howToDoIt][${howIndex}]`, howToDo || "");
    });

    if (drill.trainingVideo instanceof File) {
      const videoFieldname = `trainingVideo${index}`;
      data.append(videoFieldname, drill.trainingVideo);
    } else {
      console.warn(
        `drill.trainingVideo for drill ${index} is not a File object.`
      );
    }

    // Append video reference
    data.append(
      `drills[${index}][videoReference]`,
      drill.videoReference || "N/A"
    );
  });

  try {
    const response = await axiosInstance.post("/api/trainings/create", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
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

  // Append drills
  formData.drills.forEach((drill, index) => {
    // Append each drill's fields
    data.append(`drills[${index}][drillName]`, drill.drillName || "");
    data.append(`drills[${index}][whatToDo]`, drill.whatToDo || "");
    data.append(`drills[${index}][focus]`, drill.focus || "");
    data.append(`drills[${index}][repetitions]`, drill.repetitions || "");

    // Append each "how to do it" item within the drill
    drill.howToDoIt.forEach((howToDo, howIndex) => {
      data.append(`drills[${index}][howToDoIt][${howIndex}]`, howToDo || "");
    });

    // Append the original name of the video (if it exists) as a separate field
    if (drill.trainingVideo instanceof File) {
      const videoFieldname = `trainingVideo${index}`;
      data.append(videoFieldname, drill.trainingVideo);
    }

    data.append(`drills[${index}][trainingVideoUrl]`, drill.trainingVideoUrl);

    // Append video reference
    data.append(`drills[${index}][videoReference]`, drill.videoReference || "");
  });

  try {
    const response = await axiosInstance.put(
      `/api/trainings/update/${id}`,
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
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
    data.append("finishedUserVideo", file);
    data.append("finishedUserVideoName", file.name);
  }

  try {
    const response = await axiosInstance.put(
      `/api/trainings/finish-drill/${trainingId}/${drillId}`,
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
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
