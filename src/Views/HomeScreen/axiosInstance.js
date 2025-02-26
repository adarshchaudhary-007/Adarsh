import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://app.aktivedirectory.com/api",
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
});

export default axiosInstance;
