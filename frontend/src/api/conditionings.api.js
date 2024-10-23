import axiosInstance from "../axios/axios";

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
  const data = new FormData();

  if (formData.warmUpVideo instanceof File) {
    data.append("warmUpVideo", formData.warmUpVideo);
  }

  if (formData.cooldownVideo instanceof File) {
    data.append("cooldownVideo", formData.cooldownVideo);
  }

  try {
    const response = await axiosInstance.post(
      "/api/conditionings/create",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error creating conditioning:", error);
    throw error;
  }
};

export const updateConditioningApi = async (id, formData) => {
  const data = new FormData();

  if (formData.warmUpVideo instanceof File) {
    data.append("warmUpVideo", formData.warmUpVideo);
  }

  if (formData.cooldownVideo instanceof File) {
    data.append("cooldownVideo", formData.cooldownVideo);
  }

  try {
    const response = await axiosInstance.put(
      `/api/conditionings/update/${id}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
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
