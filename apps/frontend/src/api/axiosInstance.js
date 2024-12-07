import Axios from "axios";

const axiosInstance = Axios.create({
  baseURL: "http://127.0.0.1:4000/api/v1/",
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
