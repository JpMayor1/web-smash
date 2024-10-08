import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const usetrainingStore = create(
  persist(
    (set) => ({
      trainings: [],

      setTrainings: (trainings) => set({ trainings }),

      addTraining: (newTraining) =>
        set((state) => ({ trainings: [...state.trainings, newTraining] })),

      updateTraining: (updatedTraining) =>
        set((state) => ({
          trainings: state.trainings.map((training) =>
            training.id === updatedTraining.id ? updatedTraining : training
          ),
        })),

      deleteTraining: (trainingId) =>
        set((state) => ({
          trainings: state.trainings.filter(
            (training) => training.id !== trainingId
          ),
        })),
    }),
    {
      name: "training-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
