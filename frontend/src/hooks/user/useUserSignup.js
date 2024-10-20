import { useState } from "react";
import { SignupUserApi } from "../../api/auth";
import { useAuthStore } from "../../stores/useAuthStore";
import toast from "react-hot-toast";
import axios from "axios";

function handleInputErrors(
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  gradeLevel,
  section,
  gender
) {
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !confirmPassword ||
    !section ||
    !gender ||
    typeof gradeLevel !== "number" ||
    gradeLevel <= 0
  ) {
    toast.error("Please fill in all fields");
    return false;
  }

  return true;
}

const useUserSignup = () => {
  const [loading, setLoading] = useState(false);
  const setAuthUser = useAuthStore((state) => state.setAuthUser);

  const signup = async (
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    gradeLevel,
    section,
    gender
  ) => {
    const success = handleInputErrors(
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      gradeLevel,
      section,
      gender
    );
    if (!success) return;
    setLoading(true);
    try {
      const res = await SignupUserApi(
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        gradeLevel,
        section,
        gender
      );
      const result = res.data;

      if (result.error) {
        throw new Error(result.error);
      }

      setAuthUser(result);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          toast.error(error.response.data.error);
        } else {
          toast.error("An error occurred during signup.");
        }
      } else if (error) {
        toast.error(error.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useUserSignup;
