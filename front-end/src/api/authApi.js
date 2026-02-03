import apiClient from "./Axios";

const authApi = {
  login: (data) => apiClient.post("/auth/login", data),
  profile: () => apiClient.get("/auth/profile"),
};

export default authApi;

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});