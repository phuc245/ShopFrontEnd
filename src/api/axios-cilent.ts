import { LocalUtils } from "@/utils/local-util";
import axios from "axios";

const axiosClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: "http://localhost:3001/",
});

axiosClient.interceptors.request.use((config) => {
  const local = LocalUtils.getLocalToken();

  if (local && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${local}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      LocalUtils.removeLocalToken();
      window.location.href = "/admin/login";
    }
  }
);

export default axiosClient;
