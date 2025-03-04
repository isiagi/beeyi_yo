import axios from "axios";

const createAuthInstance = () => {
  // Create the axios instance
  const instance = axios.create({
    baseURL: "https://beeyi-be.onrender.com/api",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  // Add request interceptor to dynamically add token
  instance.interceptors.request.use(
    (config) => {
      // Only try to get token if window is defined (client-side)
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Token ${token}`;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

const authInstance = createAuthInstance();

export default authInstance;
