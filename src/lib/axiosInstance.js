import axios from "axios";
import { toast } from "react-toastify";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log("Request error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.message === "Network Error") {
      // Show network error toast
      toast.error("Network error! Please check your internet connection.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
