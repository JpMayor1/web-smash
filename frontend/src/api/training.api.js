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
  data.append("day", formData.day);
  data.append("title", formData.title);
  formData.descriptions.forEach((desc) => data.append("descriptions[]", desc));
  data.append("trainingVideo", formData.trainingVideo);
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
  try {
    const response = await axiosInstance.put(
      `/api/trainings/update/${id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
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
