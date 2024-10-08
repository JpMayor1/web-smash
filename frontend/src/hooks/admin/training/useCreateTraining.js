// hooks/useCreateTraining.js
import { useState } from "react";
import { createTrainingApi } from "../../../api/training.api";
import toast from "react-hot-toast";
import axios from "axios";
import { usetrainingStore } from "../../../stores/useTrainingStore";

const useCreateTraining = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { addTraining } = usetrainingStore((state) => state);

  const createTraining = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await createTrainingApi(formData);

      if (response.error) {
        throw new Error(response.error);
      }

      const result = response.data;
      addTraining(result);
      toast.success("Training created successfully.");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          toast.error(error.response.data.error);
        } else {
          toast.error("An error occurred while creating trainings.");
        }
      } else {
        toast.error("An error occurred while creating trainings.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { createTraining, loading, error };
};

export default useCreateTraining;
