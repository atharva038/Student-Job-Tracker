import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/jobs", // change later after backend deploy
});

export const fetchJobs = () => API.get("/");
export const addJob = (data) => API.post("/", data);
export const updateJob = (id, status) => API.patch(`/${id}`, { status });
export const deleteJob = (id) => API.delete(`/${id}`);
