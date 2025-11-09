import axios from "axios";

// Build a safe baseURL that avoids duplicating `/api/jobs` if the env already contains it.
const rawBase = import.meta.env.VITE_API_BASE_URL || "";
const trimmed = rawBase.replace(/\/+$/g, "");
// If the provided base already ends with /api/jobs, use it as-is, otherwise append /api/jobs
const baseURL = trimmed.endsWith("/api/jobs") ? trimmed : `${trimmed}/api/jobs`;

const API = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Updated endpoints (these are relative to baseURL which now points to /api/jobs)
export const fetchJobs = () => API.get("/");
export const addJob = (data) => API.post("/", data);
export const updateJob = (id, status) => API.patch(`/${id}`, {status});
export const deleteJob = (id) => API.delete(`/${id}`);
