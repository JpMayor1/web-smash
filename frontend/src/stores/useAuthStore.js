import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      authUser: null,
      setAuthUser: (user) => set({ authUser: user }),
      clearAuthUser: () => set({ authUser: null }),
    }),
    {
      name: "user-auth-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
