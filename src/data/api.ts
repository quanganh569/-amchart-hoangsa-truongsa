import axios from "axios";
const API = axios.create({ baseURL: "https://localhost:2222" });
API.interceptors.response.use(
  (response: { data: any }) => {
    return response.data;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export default API;
