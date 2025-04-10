import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchJobs = () => API.get("/");
export const addJob = (data) => API.post("/", data);
export const updateJob = (id, status) => API.patch(`/${id}`, { status });
export const deleteJob = (id) => API.delete(`/${id}`);
