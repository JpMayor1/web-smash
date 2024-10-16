import { useState } from "react";
import { updateTrainingApi } from "../../../api/training.api";
import { usetrainingStore } from "../../../stores/useTrainingStore";
import toast from "react-hot-toast";
import axios from "axios";

const useUpdateTraining = () => {
  const [loading, setLoading] = useState(false);
  const { updateTraining } = usetrainingStore();

  const updateTrainingData = async (trainingId, formData) => {
    setLoading(true);

    try {
      const response = await updateTrainingApi(trainingId, formData);

      if (response.error) {
        throw new Error(response.error);
      }

      updateTraining(trainingId, response.data.training);
      toast.success("Training updated successfully.");
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
          toast.error("An error occurred while updating training.");
          return false;
        }
      } else {
        toast.error("An error occurred while updating training.");
        return false;
      }
    } finally {
      setLoading(false);
    }
  };

  return { updateTrainingData, loading };
};

export default useUpdateTraining;
