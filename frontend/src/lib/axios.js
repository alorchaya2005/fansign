import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://fansign-46gd.onrender.com/api/musk",
  withCredentials: true,
});
