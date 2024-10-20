import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { finishDrillApi } from "../../api/training.api";
import { usetrainingStore } from "../../stores/useTrainingStore";

const useFinishDrill = () => {
  const [loading, setLoading] = useState(false);
  const { updateTraining } = usetrainingStore();

  const finishDrill = async (trainingId, drillId, file) => {
    setLoading(true);

    try {
      const response = await finishDrillApi(trainingId, drillId, file);

      if (response.error) {
        throw new Error(response.error);
      }

      toast.success(response.data.message);
      updateTraining(trainingId, response.data.training);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          toast.error(error.response.data.error);
        } else {
          toast.error("An error occurred while finishing drill.");
        }
      } else {
        toast.error("An error occurred while finishing drill.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { finishDrill, loading };
};

export default useFinishDrill;
