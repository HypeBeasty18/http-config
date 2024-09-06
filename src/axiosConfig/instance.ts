// instance.ts
import axios, { AxiosRequestConfig, AxiosInstance } from "axios";
import { defaultConfig } from "../config";
import { setupInterceptors } from "./interceptors";
import { TypeServices } from "../types";
import { resolveHost } from "../utils/lib";

// конфиг axios
const axiosConfig = {
  currentConfig: { ...defaultConfig },
  currentHeaders: defaultConfig.headers,
};

// создание инстанса axios
const createAxiosInstance = (
  service: TypeServices,
  requestConfig?: AxiosRequestConfig
): AxiosInstance => {
  const mergedConfig: AxiosRequestConfig = {
    ...axiosConfig.currentConfig,
    ...requestConfig,
    headers: {
      ...axiosConfig.currentConfig.headers,
      ...(requestConfig?.headers || {}),
    },
    baseURL: resolveHost(service),
  };

  const axiosInstance = axios.create(mergedConfig);

  setupInterceptors(axiosInstance, service);

  return axiosInstance;
};

export { createAxiosInstance, axiosConfig };
