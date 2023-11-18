import axios from "axios";

const END_POINT = 'http://localhost:8080';

const api = axios.create({
  baseURL: END_POINT,
  timeout: 5000,
  headers: {
    accept: "application/json",
    "Content-Type": "application/json"
  }
});

export const servies = {
  getJobs: async () => {
    return await api.get('/jobs', {})
  },
  updateJobStatus: async (id: number, status: string) => {
    return await api.put(`/jobs/${id}?status=${status}`, { status: status });
  }
}