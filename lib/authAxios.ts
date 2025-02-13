import axios from "axios";

const authInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Token ${localStorage.getItem("token")}`,
  },
});

export default authInstance;
