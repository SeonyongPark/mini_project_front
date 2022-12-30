import axios from "axios";

// local vue api axios instance
function apiInstance() {
  const instance = axios.create({
    // baseURL: "http://localhost:80/",
    // baseURL: "http://192.168.31.77:80/",
    baseURL: "http://192.168.31.76:80/",
    headers: {
      // headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return instance;
}
export { apiInstance };
