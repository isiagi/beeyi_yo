import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://beeyi-be.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});
