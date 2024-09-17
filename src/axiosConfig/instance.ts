import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { defaultConfig } from "../config";
import { setupInterceptors } from "./interceptors";
import { IRequestWithData, IRequestWithoutData, TypeServices } from "../types";
import { handleRequestError, handleSuccessNotification, resolveHost } from "../lib/utils";
import { showNotification } from "../notifications";

class AxiosService {
  private axiosInstance: AxiosInstance;

  constructor(service: TypeServices, config?: AxiosRequestConfig) {
    const mergedConfig: AxiosRequestConfig = {
      ...defaultConfig,
      ...config,
      headers: {
        ...defaultConfig.headers,
        ...(config?.headers || {}),
      },
      baseURL: resolveHost(service),
    };

    this.axiosInstance = axios.create(mergedConfig);
    setupInterceptors(this.axiosInstance, service);
  }

  public async getRequest({
    url,
    config = {},
    errorNotification = false,
    successMessage = null,
    errorMessage = null,
    successNotificationType = null,
  }: IRequestWithoutData) {
    try {
      const response = await this.axiosInstance.get(url, config);

      handleSuccessNotification({
        successMessage,
        notificationType: successNotificationType,
      });

      return response.data;
    } catch (error) {
      if (!errorMessage) {
        handleRequestError({ error, isNotification: errorNotification });
      } else {
        showNotification({ message: errorMessage, type: "error" });
      }

      return error;
    }
  }

  public async postRequest({
    url,
    config = {},
    errorNotification = false,
    successMessage = null,
    errorMessage = null,
    successNotificationType = null,
    data,
  }: IRequestWithData) {
    try {
      const response = await this.axiosInstance.post(url, data, config);

      handleSuccessNotification({
        successMessage,
        notificationType: successNotificationType,
      });

      return response.data;
    } catch (error) {
      if (!errorMessage) {
        handleRequestError({ error, isNotification: errorNotification });
      } else {
        showNotification({ message: errorMessage, type: "error" });
      }
      return error;
    }
  }

  public async putRequest({
    url,
    config = {},
    errorNotification = false,
    successMessage = null,
    errorMessage = null,
    successNotificationType = null,
    data,
  }: IRequestWithData) {
    try {
      const response = await this.axiosInstance.put(url, data, config);

      handleSuccessNotification({
        successMessage,
        notificationType: successNotificationType,
      });

      return response.data;
    } catch (error) {
      if (!errorMessage) {
        handleRequestError({ error, isNotification: errorNotification });
      } else {
        showNotification({ message: errorMessage, type: "error" });
      }
      return error;
    }
  }

  public async patchRequest({
    url,
    config = {},
    errorNotification = false,
    successMessage = null,
    errorMessage = null,
    successNotificationType = null,
    data,
  }: IRequestWithData) {
    try {
      const response = await this.axiosInstance.patch(url, data, config);

      handleSuccessNotification({
        successMessage,
        notificationType: successNotificationType,
      });

      return response.data;
    } catch (error) {
      if (!errorMessage) {
        handleRequestError({ error, isNotification: errorNotification });
      } else {
        showNotification({ message: errorMessage, type: "error" });
      }
      return error;
    }
  }

  public async deleteRequest({
    url,
    config = {},
    errorNotification = false,
    successMessage = null,
    errorMessage = null,
    successNotificationType = null,
  }: IRequestWithoutData) {
    try {
      const response = await this.axiosInstance.delete(url, config);

      handleSuccessNotification({
        successMessage,
        notificationType: successNotificationType,
      });

      return response.data;
    } catch (error) {
      if (!errorMessage) {
        handleRequestError({ error, isNotification: errorNotification });
      } else {
        showNotification({ message: errorMessage, type: "error" });
      }
      return error;
    }
  }
}

export default AxiosService;




// // instance.ts
// import axios, { AxiosRequestConfig, AxiosInstance, RawAxiosRequestHeaders } from "axios";
// import { defaultConfig } from "../config";
// import { setupInterceptors } from "./interceptors";
// import { TypeServices } from "../types";
// import { resolveHost } from "../lib/utils";

// // конфиг axios
// const httpConfig: {
//   currentConfig: AxiosRequestConfig;
//   currentHeaders: RawAxiosRequestHeaders;
// } = {
//   currentConfig: { ...defaultConfig },
//   currentHeaders: defaultConfig.headers as RawAxiosRequestHeaders,
// };

// // создание инстанса axios
// const createAxiosInstance = (
//   service: TypeServices,
//   requestConfig?: AxiosRequestConfig
// ): AxiosInstance => {
//   const mergedConfig: AxiosRequestConfig = {
//     ...httpConfig.currentConfig,
//     ...requestConfig,
//     headers: {
//       ...httpConfig.currentConfig.headers,
//       ...(requestConfig?.headers || {}),
//     },
//     baseURL: resolveHost(service),
//   };

//   const axiosInstance = axios.create(mergedConfig);

//   setupInterceptors(axiosInstance, service);

//   return axiosInstance;
// };

// export { createAxiosInstance, httpConfig };
