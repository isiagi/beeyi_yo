/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

// Zustand store for authentication
const useAuthStore = create((set) => ({
  user: null,
  token: null,

  // Set user and token, store token in localStorage
  setUser: (user: any, token: any) => {
    localStorage.setItem("token", token);
    set({ user, token });
  },

  // Clear user and token, remove token from localStorage
  clearUser: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },

  // Function to initialize user from localStorage if available
  initializeUser: () => {
    const token = localStorage.getItem("token");
    if (token) {
      set({ token });
      // Optionally, fetch user details with the token here if needed
    }
  },
}));

export default useAuthStore;
