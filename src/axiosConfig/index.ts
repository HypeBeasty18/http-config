import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

import { setupInterceptors } from "./interceptors";
import {
  IHosts,
  IRequestWithData,
  IRequestWithoutData,
  TypeEnvironment,
  TypeServices,
} from "../types";
import {
  handleRequestError,
  handleSuccessNotification,
  resolveHost,
  mergeAxiosConfigs,
} from "../lib/utils";
import { showNotification } from "../notifications";

interface IHttpService {
  config?: AxiosRequestConfig;
  hosts: IHosts;
  build_env: TypeEnvironment;
}

class httpService {
  private axiosConfig: AxiosRequestConfig = {};

  private build_env: TypeEnvironment = "stage";

  private hosts: IHosts = {} as IHosts;

  constructor({ config, build_env, hosts }: IHttpService) {
    this.axiosConfig = mergeAxiosConfigs({
      currentConfig: this.axiosConfig,
      newConfig: config || {},
    });

    this.build_env = build_env;
    this.hosts = hosts;
  }

  private createInstance(service: TypeServices, config: AxiosRequestConfig = {}): AxiosInstance {
    const mergedConfig = mergeAxiosConfigs({
      currentConfig: this.axiosConfig,
      newConfig: {
        ...config,
        baseURL: resolveHost({ buildEnv: this.build_env, hosts: this.hosts, service }),
      },
    });

    const axiosInstance = axios.create(mergedConfig);
    setupInterceptors(axiosInstance, service);

    return axiosInstance;
  }

  public async getRequest({
    service,
    url,
    config = {},
    errorNotification = false,
    successMessage = null,
    errorMessage = null,
    successNotificationType = null,
  }: IRequestWithoutData) {
    try {
      const axiosInstance = this.createInstance(service, config);
      const response = await axiosInstance.get(url);

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
    service,
    url,
    config = {},
    errorNotification = false,
    successMessage = null,
    errorMessage = null,
    successNotificationType = null,
    data,
  }: IRequestWithData) {
    try {
      const axiosInstance = this.createInstance(service, config);
      const response = await axiosInstance.post(url, data);

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
    service,
    url,
    config = {},
    errorNotification = false,
    successMessage = null,
    errorMessage = null,
    successNotificationType = null,
    data,
  }: IRequestWithData) {
    try {
      const axiosInstance = this.createInstance(service, config);
      const response = await axiosInstance.put(url, data);

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
    service,
    url,
    config = {},
    errorNotification = false,
    successMessage = null,
    errorMessage = null,
    successNotificationType = null,
    data,
  }: IRequestWithData) {
    try {
      const axiosInstance = this.createInstance(service, config);
      const response = await axiosInstance.patch(url, data);

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
    service,
    url,
    config = {},
    errorNotification = false,
    successMessage = null,
    errorMessage = null,
    successNotificationType = null,
  }: IRequestWithoutData) {
    try {
      const axiosInstance = this.createInstance(service, config);
      const response = await axiosInstance.delete(url);

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

export default httpService;
