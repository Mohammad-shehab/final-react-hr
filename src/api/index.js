import axios from "axios";
import { getToken } from "../api/storage";

const instance = axios.create({
  baseURL: process.env.API_BASE_URL || "http://192.168.8.166:5278/api",
});

instance.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default instance;