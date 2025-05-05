import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:9090/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token if it exists and is valid
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && token !== "null") {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
