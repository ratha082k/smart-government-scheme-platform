import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getSchemes = () => api.get("/schemes");

export const addScheme = (data) => api.post("/schemes", data);

export const updateScheme = (id, data) =>
  api.put(`/schemes/${id}`, data);

export const deleteScheme = (id) =>
  api.delete(`/schemes/${id}`);

export default api;