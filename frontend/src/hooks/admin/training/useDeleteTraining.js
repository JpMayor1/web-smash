import { useState } from "react";
import { deleteTrainingApi } from "../../../api/training.api";
import { usetrainingStore } from "../../../stores/useTrainingStore";
import toast from "react-hot-toast";
import axios from "axios";

const useDeleteTraining = () => {
  const [loading, setLoading] = useState(false);
  const { deleteTrainingState } = usetrainingStore();

  const deleteTraining = async (trainingId) => {
    setLoading(true);

    try {
      const response = await deleteTrainingApi(trainingId);

      if (response.error) {
        throw new Error(response.error);
      }

      deleteTrainingState(trainingId);
      toast.success("Training deleted successfully.");
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
          toast.error("An error occurred while deleting the training.");
          return false;
        }
      } else {
        toast.error("An error occurred while deleting the training.");
        return false;
      }
    } finally {
      setLoading(false);
    }
  };

  return { deleteTraining, loading };
};

export default useDeleteTraining;
