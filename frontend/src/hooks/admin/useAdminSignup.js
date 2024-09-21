import { useState } from "react";
import { SignupAdminApi } from "../../api/auth";
import { useAuthStore } from "../../stores/useAuthStore";
import toast from "react-hot-toast";
import axios from "axios";

function handleInputErrors(
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  secretKey
) {
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !confirmPassword ||
    !secretKey
  ) {
    toast.error("Please fill in all fields");
    return false;
  }

  return true;
}

const useAdminSignup = () => {
  const [loading, setLoading] = useState(false);
  const setAuthUser = useAuthStore((state) => state.setAuthUser);

  const signup = async (
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    secretKey
  ) => {
    console.log(
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      secretKey
    );
    const success = handleInputErrors(
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      secretKey
    );
    if (!success) return;
    setLoading(true);
    try {
      const res = await SignupAdminApi(
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        secretKey
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

export default useAdminSignup;
