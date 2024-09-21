import { useState } from "react";
import { LoginAdminApi } from "../../api/auth";
import { useAuthStore } from "../../stores/useAuthStore";
import toast from "react-hot-toast";
import axios from "axios";

function handleInputErrors(email, password) {
  if (!email || !password) {
    toast.error("Please fill in all fields");
    return false;
  }

  return true;
}

const useAdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const setAuthUser = useAuthStore((state) => state.setAuthUser);

  const login = async (email, password) => {
    const success = handleInputErrors(email, password);
    if (!success) return;
    setLoading(true);
    try {
      const res = await LoginAdminApi(email, password);
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
          toast.error("An error occurred during login.");
        }
      } else if (error) {
        toast.error(error.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useAdminLogin;
