import { httpConfig } from "../axiosConfig/instance";
import { AxiosRequestConfig, AxiosRequestHeaders } from "axios";

// Установка нового конфига axios
const setNewAxiosConfig = (newConfig: AxiosRequestConfig) => {
  httpConfig.currentConfig = { ...newConfig };
  if (newConfig.headers) {
    httpConfig.currentHeaders = newConfig.headers;
    httpConfig.currentConfig.headers = httpConfig.currentHeaders;
  }
};

// ОБновление  конфига axios
const updateAxiosConfig = (config: AxiosRequestConfig) => {
  httpConfig.currentConfig = { ...httpConfig.currentConfig, ...config };
  if (config.headers) {
    httpConfig.currentHeaders = {
      ...httpConfig.currentHeaders,
      ...config.headers,
    };
    httpConfig.currentConfig.headers = httpConfig.currentHeaders;
  }
};

// Установка новых хидеров axios
const setNewAxiosHeaders = (newHeaders: AxiosRequestHeaders) => {
  httpConfig.currentHeaders = newHeaders;
  httpConfig.currentConfig.headers = httpConfig.currentHeaders;
};

// ОБновление хидеров axios
const updateAxiosHeaders = (headers: AxiosRequestHeaders) => {
  httpConfig.currentHeaders = { ...httpConfig.currentHeaders, ...headers };
  httpConfig.currentConfig.headers = httpConfig.currentHeaders;
};

export { setNewAxiosConfig, updateAxiosConfig, setNewAxiosHeaders, updateAxiosHeaders };
