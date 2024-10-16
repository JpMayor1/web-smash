import { useState } from "react";
import { createTrainingApi } from "../../../api/training.api";
import { usetrainingStore } from "../../../stores/useTrainingStore";
import toast from "react-hot-toast";
import axios from "axios";

const useCreateTraining = () => {
  const [loading, setLoading] = useState(false);
  const { addTraining } = usetrainingStore();

  const createTraining = async (formData) => {
    setLoading(true);

    try {
      const response = await createTrainingApi(formData);

      if (response.error) {
        throw new Error(response.error);
      }

      addTraining(response.data.training);
      toast.success("Training created successfully.");
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
          toast.error("An error occurred while creating trainings.");
          return false;
        }
      } else {
        toast.error("An error occurred while creating trainings.");
        return false;
      }
    } finally {
      setLoading(false);
    }
  };

  return { createTraining, loading };
};

export default useCreateTraining;
