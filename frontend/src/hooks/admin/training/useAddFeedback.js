import { useState } from "react";
import { addFeddbackApi } from "../../../api/training.api";
import toast from "react-hot-toast";
import axios from "axios";
import { usetrainingStore } from "../../../stores/useTrainingStore";

const useAddFeedback = () => {
  const [feedbackLoading, setLoading] = useState(false);
  const { updateTraining } = usetrainingStore();

  const addFeedback = async (trainingId, drillId, userId, feedback) => {
    setLoading(true);

    try {
      const response = await addFeddbackApi(
        trainingId,
        drillId,
        userId,
        feedback
      );

      if (response.error) {
        throw new Error(response.error);
      }
      updateTraining(trainingId, response.data.training);
      toast.success(response.data.message);
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
          toast.error("An error occurred while adding feedback.");
          return false;
        }
      } else {
        toast.error("An error occurred while adding feedback.");
        return false;
      }
    } finally {
      setLoading(false);
    }
  };

  return { addFeedback, feedbackLoading };
};

export default useAddFeedback;
