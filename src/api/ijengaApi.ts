import axios from "axios";
import { constants } from "../helpers/constants";

const api = axios.create({
  baseURL: constants.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
