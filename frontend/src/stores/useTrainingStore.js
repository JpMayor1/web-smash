import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const usetrainingStore = create(
  persist(
    (set) => ({
      trainings: [],

      setTrainings: (trainings) => set({ trainings }),

      addTraining: (newTraining) =>
        set((state) => ({ trainings: [...state.trainings, newTraining] })),

      updateTraining: (id, updatedTraining) =>
        set((state) => ({
          trainings: state.trainings.map((training) =>
            training._id === id ? updatedTraining : training
          ),
        })),

      deleteTrainingState: (trainingId) =>
        set((state) => ({
          trainings: state.trainings.filter(
            (training) => training._id !== trainingId
          ),
        })),
    }),
    {
      name: "training-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
