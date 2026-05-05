import { create } from "zustand";
import toast from "react-hot-toast";
import type { UserStore } from "../types/user";
import { getMe, logout } from "../api/auth/request";

export const useAuthStore = create<UserStore>((set) => ({
  user: null,
  isLoading: false,

  setUser: (user) => set({ user }),

  loadUser: async () => {
    set({ isLoading: true });

    try {
      const data = await getMe();

      if (data && data._id) {
        set({ user: data });
      } else {
        set({ user: null });
      }
    } catch (err) {
      set({ user: null });
      toast.error("Failed to fetch user data");
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      await logout();
    } catch (err) {
      console.log("Logout error:", err);
    } finally {
      set({ user: null, isLoading: false });
    }
  },
}));
