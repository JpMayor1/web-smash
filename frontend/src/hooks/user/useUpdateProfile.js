import { useState } from "react";

import { useAuthStore } from "../../stores/useAuthStore";
import toast from "react-hot-toast";
import axios from "axios";
import { updateUserApi } from "../../api/user.api";

const useUpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const setAuthUser = useAuthStore((state) => state.setAuthUser);

  const updateProfile = async ({
    firstName,
    lastName,
    email,
    gradeLevel,
    section,
  }) => {
    setLoading(true);
    try {
      const res = await updateUserApi({
        firstName,
        lastName,
        email,
        gradeLevel,
        section,
      });
      const result = res.data;
      if (result.error) {
        throw new Error(result.error);
      }

      setAuthUser(result.user);
      toast.success(result.message);
      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          toast.error(error.response.data.error);
          return false;
        } else {
          toast.error("An error occurred during updateProfile.");
          return false;
        }
      } else if (error) {
        toast.error(error.response.data.error);
        return false;
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, updateProfile };
};

export default useUpdateProfile;
