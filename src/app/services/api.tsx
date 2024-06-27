import axios from "axios";

export const api = axios.create({
  baseURL: "https://pis-employee-backend.onrender.com/api/v1",
});
