import { AxiosHeaders, AxiosRequestConfig } from "axios";
import { getAccessToken } from "./configState";

// Дефолтная конфигурация для axios
const defaultConfig: AxiosRequestConfig = {
  timeout: 5000,
  headers: new AxiosHeaders({
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAccessToken()}`,
  }),
};

export { defaultConfig };
