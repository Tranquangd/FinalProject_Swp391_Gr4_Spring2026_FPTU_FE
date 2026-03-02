import apiClient from "./Axios";

const authApi = {
  login: (data) => apiClient.post("/auth/login", data),
};

export default authApi;

