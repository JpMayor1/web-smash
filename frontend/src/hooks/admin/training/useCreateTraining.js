import { useState } from "react";
import { createTrainingApi } from "../../../api/training.api";
import { usetrainingStore } from "../../../stores/useTrainingStore";
import toast from "react-hot-toast";
import axios from "axios";

const useCreateTraining = () => {
  const [loading, setLoading] = useState(false);
  const { addTraining } = usetrainingStore();

  const validateFormData = (formData) => {
    switch (true) {
      case !formData.day:
        toast.error("Please select a day.");
        return false;
      case !formData.title:
        toast.error("Please enter a title.");
        return false;
      case formData.drills.length === 0:
        toast.error("Please add at least one drill.");
        return false;
      case !formData.gender:
        toast.error("Please select a gender.");
        return false;
      default:
        return true;
    }
  };

  const createTraining = async (formData) => {
    const success = validateFormData(formData);

    if (!success) {
      return;
    }

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
          toast.error(error.response.data.message);
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
