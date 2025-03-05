/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

// Zustand store for authentication
const useAuthStore = create((set) => ({
  user: null,
  token: null,

  // Set user and token, store token in localStorage
  setUser: (user: any, token: any) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    set({ user, token });
  },

  // Clear user and token, remove token from localStorage
  clearUser: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ user: null, token: null });
  },

  // Function to initialize user from localStorage if available
  initializeUser: () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      const parsedUser = JSON.parse(user);
      set({ user: parsedUser, token });
    }
  },
}));

export default useAuthStore;
