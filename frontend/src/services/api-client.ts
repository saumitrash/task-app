import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// TODO: make an APIClient class that extends apiClient
// TODO: export the APIClient class

export default apiClient;
