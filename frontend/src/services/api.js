import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getSchemes = () => api.get("/schemes");

export const addScheme = (data) => api.post("/schemes", data);

export const updateScheme = (id, data) =>
  api.put(`/schemes/${id}`, data);

export const deleteScheme = (id) =>
  api.delete(`/schemes/${id}`);

export default api;