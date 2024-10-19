import axios from "axios";
import baseURL from "./baseUrl";

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosInstance;
