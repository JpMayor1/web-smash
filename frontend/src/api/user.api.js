import axiosInstance from "../axios/axios";

export const updateUserApi = async (data) => {
  const response = await axiosInstance.put("/api/user/profile/update", data);
  return response;
};
