import axiosInstance from "../axios/axios";

// User API
const LoginUserApi = async (email, password) => {
  const response = await axiosInstance.post("/api/auth/user/login", {
    email,
    password,
  });

  return response;
};

const SignupUserApi = async (
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  gradeLevel,
  section,
  gender
) => {
  const response = await axiosInstance.post("/api/auth/user/signup", {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    gradeLevel,
    section,
    gender,
  });

  return response;
};

const LogoutUserApi = async () => {
  const response = await axiosInstance.post("/api/auth/user/logout");

  return response;
};

// Admin API
const LoginAdminApi = async (email, password) => {
  const response = await axiosInstance.post("/api/auth/admin/login", {
    email,
    password,
  });

  return response;
};

const SignupAdminApi = async (
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  secretKey
) => {
  const response = await axiosInstance.post("/api/auth/admin/signup", {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    secretKey,
  });

  return response;
};

const LogoutAdminApi = async () => {
  const response = await axiosInstance.post("/api/auth/admin/logout");

  return response;
};

export {
  LoginUserApi,
  SignupUserApi,
  LogoutUserApi,
  LoginAdminApi,
  SignupAdminApi,
  LogoutAdminApi,
};
