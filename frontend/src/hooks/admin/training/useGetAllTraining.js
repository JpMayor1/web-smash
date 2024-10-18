import { useCallback, useState } from "react";
import { usetrainingStore } from "../../../stores/useTrainingStore";
import { getAllTrainingApi } from "../../../api/training.api";

const useGetAllTraining = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setTrainings } = usetrainingStore();

  const getTrainings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllTrainingApi();
      setTrainings(response.data);
    } catch (error) {
      console.error("Error fetching trainings:", error);
      setError("Failed to load trainings. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [setTrainings]);

  return { loading, error, getTrainings };
};

export default useGetAllTraining;
