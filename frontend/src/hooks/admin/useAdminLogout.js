import { useState } from "react";
import { LogoutAdminApi } from "../../api/auth";
import { useAuthStore } from "../../stores/useAuthStore";
import toast from "react-hot-toast";
import axios from "axios";

const useAdminLogout = () => {
  const [loading, setLoading] = useState(false);
  const clearAuthUser = useAuthStore((state) => state.clearAuthUser);

  const logout = async () => {
    setLoading(true);
    try {
      const res = await LogoutAdminApi();
      const result = res.data;

      if (result.error) {
        throw new Error(result.error);
      }

      clearAuthUser();
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

  return { loading, logout };
};

export default useAdminLogout;
