import { axiosConfig } from "../axiosConfig/instance";
import { AxiosRequestConfig, AxiosRequestHeaders } from "axios";

// Установка нового конфига axios
const setNewAxiosConfig = (newConfig: AxiosRequestConfig) => {
  axiosConfig.currentConfig = { ...newConfig };
  if (newConfig.headers) {
    axiosConfig.currentHeaders = newConfig.headers;
    axiosConfig.currentConfig.headers = axiosConfig.currentHeaders;
  }
};

// ОБновление  конфига axios
const updateAxiosConfig = (config: AxiosRequestConfig) => {
  axiosConfig.currentConfig = { ...axiosConfig.currentConfig, ...config };
  if (config.headers) {
    axiosConfig.currentHeaders = {
      ...axiosConfig.currentHeaders,
      ...config.headers,
    };
    axiosConfig.currentConfig.headers = axiosConfig.currentHeaders;
  }
};

// Установка новых хидеров axios
const setNewAxiosHeaders = (newHeaders: AxiosRequestHeaders) => {
  axiosConfig.currentHeaders = newHeaders;
  axiosConfig.currentConfig.headers = axiosConfig.currentHeaders;
};

// ОБновление хидеров axios
const updateAxiosHeaders = (headers: AxiosRequestHeaders) => {
  axiosConfig.currentHeaders = { ...axiosConfig.currentHeaders, ...headers };
  axiosConfig.currentConfig.headers = axiosConfig.currentHeaders;
};

export { setNewAxiosConfig, updateAxiosConfig, setNewAxiosHeaders, updateAxiosHeaders };
