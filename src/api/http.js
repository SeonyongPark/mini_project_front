import axios from "axios";

// axios.defaults.headers["auth_token"] = sessionStorage.getItem("access-token");
// axios 객체 생성

// axios.defaults.withCredentials = true;

export default axios.create({
  // baseURL: "http://localhost:80/",
  // baseURL: "http://192.168.31.77:80/",
  baseURL: "http://192.168.31.76:80/",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    // auth_token: sessionStorage.getItem("access-token"),
  },
});
