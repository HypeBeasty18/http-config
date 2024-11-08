import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import { setupInterceptorsTokens } from "./interceptors/tokens";
import { IRequestWithData, IRequestWithoutData, TypeServices } from "../types";
import {
  handleRequestError,
  handleSuccessNotification,
  resolveHost,
  mergeAxiosConfigs,
} from "../lib/utils";
import { showNotification } from "../notifications";
import { getBuildEnv, getHosts, getQueryClient } from "../config";
import { setupInterceptorsCSRF } from "./interceptors/csrf";
import { z } from "zod";
import { MobxQuery, stateTimeInMin } from "../lib/react-query";

interface IHttpService {
  config?: AxiosRequestConfig;
}

class HttpService {
  private axiosConfig: AxiosRequestConfig = {};

  constructor({ config }: IHttpService) {
    this.axiosConfig = mergeAxiosConfigs({
      currentConfig: this.axiosConfig,
      newConfig: config || {},
    });
  }

  private createInstance(
    service: TypeServices,
    config: AxiosRequestConfig = {},
    isCSRF: boolean
  ): AxiosInstance {
    const buildEnv = getBuildEnv();

    const hosts = getHosts();

    const mergedConfig = mergeAxiosConfigs({
      currentConfig: this.axiosConfig,
      newConfig: {
        ...config,
        baseURL: resolveHost({ buildEnv, hosts, service }),
      },
    });

    const axiosInstance = axios.create(mergedConfig);

    if (isCSRF) {
      setupInterceptorsCSRF(axiosInstance, service);
    } else {
      setupInterceptorsTokens(axiosInstance, service);
    }

    return axiosInstance;
  }

  public async getRequest<T = any>({
    service,
    url,
    config = {},
    isCSRF = false,
    schema = z.any(),
    cache = false,
    invalidate = false,
    queryKey,
    queryOptions,
    errorNotification = false,
    successMessage = null,
    errorMessage = null,
    successNotificationType = "success",
  }: IRequestWithoutData): Promise<AxiosResponse<T>> {
    try {
      const queryKeyUrl = `${resolveHost({
        buildEnv: getBuildEnv(),
        hosts: getHosts(),
        service,
      })}${url}`;

      const axiosInstance = this.createInstance(service, config, isCSRF);

      type TypeResponse = z.infer<typeof schema>;

      let response: AxiosResponse<TypeResponse>;

      invalidate &&
        (await getQueryClient().invalidateQueries({
          queryKey: queryKey ? queryKey : [queryKeyUrl],
        }));

      const { getData } = new MobxQuery(
        () => ({
          queryKey: queryKey ? queryKey : [queryKeyUrl],
          queryFn: async () => axiosInstance.get(url),
          staleTime: cache ? stateTimeInMin(10) : stateTimeInMin(0),
          ...queryOptions,
        }),
        getQueryClient()
      );

      response = (await getData()) as AxiosResponse<TypeResponse>;

      schema.parse(response.data);

      handleSuccessNotification({
        successMessage,
        notificationType: successNotificationType,
      });

      return response;
    } catch (error) {
      if (!errorMessage) {
        handleRequestError({ error, isNotification: errorNotification });
      } else {
        showNotification({ message: errorMessage, type: "error" });
      }

      throw error;
    }
  }

  public async postRequest({
    service,
    url,
    config = {},
    isCSRF = false,
    schema = z.any(),
    errorNotification = false,
    successMessage = null,
    errorMessage = null,
    successNotificationType = null,
    data,
  }: IRequestWithData) {
    try {
      const axiosInstance = this.createInstance(service, config, isCSRF);
      const response = await axiosInstance.post(url, data);

      handleSuccessNotification({
        successMessage,
        notificationType: successNotificationType,
      });

      schema.parse(response.data);

      return response;
    } catch (error) {
      if (!errorMessage) {
        handleRequestError({ error, isNotification: errorNotification });
      } else {
        showNotification({ message: errorMessage, type: "error" });
      }

      throw error;
    }
  }

  public async putRequest({
    service,
    url,
    config = {},
    isCSRF = false,
    schema = z.any(),
    errorNotification = false,
    successMessage = null,
    errorMessage = null,
    successNotificationType = null,
    data,
  }: IRequestWithData) {
    try {
      const axiosInstance = this.createInstance(service, config, isCSRF);
      const response = await axiosInstance.put(url, data);

      handleSuccessNotification({
        successMessage,
        notificationType: successNotificationType,
      });

      schema.parse(response.data);

      return response;
    } catch (error) {
      if (!errorMessage) {
        handleRequestError({ error, isNotification: errorNotification });
      } else {
        showNotification({ message: errorMessage, type: "error" });
      }

      throw error;
    }
  }

  public async patchRequest({
    service,
    url,
    config = {},
    isCSRF = false,
    schema = z.any(),
    errorNotification = false,
    successMessage = null,
    errorMessage = null,
    successNotificationType = null,
    data,
  }: IRequestWithData) {
    try {
      const axiosInstance = this.createInstance(service, config, isCSRF);
      const response = await axiosInstance.patch(url, data);

      handleSuccessNotification({
        successMessage,
        notificationType: successNotificationType,
      });

      schema.parse(response.data);

      return response;
    } catch (error) {
      if (!errorMessage) {
        handleRequestError({ error, isNotification: errorNotification });
      } else {
        showNotification({ message: errorMessage, type: "error" });
      }

      throw error;
    }
  }

  public async deleteRequest({
    service,
    url,
    config = {},
    isCSRF = false,
    schema = z.any(),
    errorNotification = false,
    successMessage = null,
    errorMessage = null,
    successNotificationType = null,
  }: IRequestWithoutData) {
    try {
      const axiosInstance = this.createInstance(service, config, isCSRF);
      const response = await axiosInstance.delete(url);

      handleSuccessNotification({
        successMessage,
        notificationType: successNotificationType,
      });

      schema.parse(response.data);

      return response;
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Ошибка валидации данных", error);
      } else if (!errorMessage) {
        handleRequestError({ error, isNotification: errorNotification });
      } else {
        showNotification({ message: errorMessage, type: "error" });
      }

      throw error;
    }
  }
}

export default HttpService;
