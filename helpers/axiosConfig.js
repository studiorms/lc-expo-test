import axios from "axios";

const instance = axios.create({
  //  baseURL: "http://localhost:8080/api",
  baseURL: "http://192.168.1.104:8080/api",
});

export default instance;
