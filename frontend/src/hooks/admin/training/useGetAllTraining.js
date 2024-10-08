import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { usetrainingStore } from "../../../stores/useTrainingStore";
import { getAllTrainingApi } from "../../../api/training.api";

const useGetAllTraining = () => {
  const [loading, setLoading] = useState(false);
  const setTrainingStore = usetrainingStore((state) => state.setTrainings);

  const getTrainings = async () => {
    setLoading(true);
    try {
      const response = await getAllTrainingApi();

      if (response.error) {
        throw new Error(response.error);
      }

      const result = response.data;
      setTrainingStore(result);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          toast.error(error.response.data.error);
        } else {
          toast.error("An error occurred while fetching trainings.");
        }
      } else {
        toast.error("An error occurred while fetching trainings.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, getTrainings };
};

export default useGetAllTraining;
