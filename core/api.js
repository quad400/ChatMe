import axios from "axios";

import { Platform } from "react-native";

export const ADDRESS =
  Platform.OS === "ios"
    ? "http://localhost:5000"
    : "http://192.168.43.63:5000";

const api = axios.create({
  baseURL: ADDRESS + "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const BASE_URL = ADDRESS + "/api";

export default api;
