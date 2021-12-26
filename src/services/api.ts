import axios from "axios";

const api = axios.create({
    // baseURL: "https://server.app-com.digital",
    baseURL: "http://192.168.0.246:3333",
});

export default api;
