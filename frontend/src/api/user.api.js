import axiosInstance from "../axios/axios";

export const getAllUsersApi = async () => {
  try {
    const response = await axiosInstance.get("/api/user/profile/getAllUsers");
    return response;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};

export const updateUserApi = async (data) => {
  try {
    const response = await axiosInstance.put("/api/user/profile/update", data);
    return response;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};
