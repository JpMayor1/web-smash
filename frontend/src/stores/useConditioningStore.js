import { create } from "zustand";
import {
  getAllConditioningsApi,
  createConditioningApi,
  updateConditioningApi,
  deleteConditioningApi,
} from "../api/conditionings.api";
import toast from "react-hot-toast";

const useConditioningStore = create((set) => ({
  conditionings: [],
  loading: false,
  createConditioningLoading: false,
  updateConditioningLoading: false,
  deleteConditioningLoading: false,
  error: null,

  // Fetch all conditionings
  fetchConditionings: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getAllConditioningsApi();
      set({ conditionings: response.data });
    } catch (error) {
      set({ error });
    } finally {
      set({ loading: false });
    }
  },

  // Create a new conditioning
  createConditioning: async (formData) => {
    set({ createConditioningLoading: true, error: null });
    try {
      const newConditioning = await createConditioningApi(formData);
      set((state) => ({
        conditionings: [...state.conditionings, newConditioning.data],
      }));
      toast.success("Conditioning created successfully!");
    } catch (error) {
      set({ error });
    } finally {
      set({ createConditioningLoading: false });
    }
  },

  // Update an existing conditioning
  updateConditioning: async (id, formData, conditioning) => {
    set({ updateConditioningLoading: true, error: null });
    try {
      const updatedConditioning = await updateConditioningApi(
        id,
        formData,
        conditioning
      );
      set((state) => ({
        conditionings: state.conditionings.map((conditioning) =>
          conditioning._id === id ? updatedConditioning.data : conditioning
        ),
      }));
      toast.success("Conditioning updated successfully!");
    } catch (error) {
      set({ error });
    } finally {
      set({ updateConditioningLoading: false });
    }
  },

  // Delete a conditioning
  deleteConditioning: async (id) => {
    set({ deleteConditioningLoading: true, error: null });
    try {
      await deleteConditioningApi(id);
      set((state) => ({
        conditionings: state.conditionings.filter(
          (conditioning) => conditioning._id !== id
        ),
      }));
      toast.success("Conditioning deleted successfully!");
    } catch (error) {
      set({ error });
    } finally {
      set({ deleteConditioningLoading: false });
    }
  },
}));

export default useConditioningStore;
