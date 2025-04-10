import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/jobs`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Updated endpoints
export const fetchJobs = () => API.get("/");
export const addJob = (data) => API.post("/", data);
export const updateJob = (id, status) => API.patch(`/${id}`, { status });
export const deleteJob = (id) => API.delete(`/${id}`);
