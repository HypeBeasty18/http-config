import { createAxiosInstance } from "./axiosConfig/instance";
import { showNotification } from "./notifications";
import { IRequestWithoutData, IRequestWithData } from "./types";
import { handleRequestError, handleSuccessNotification } from "./lib/utils";

export const getRequest = async ({
  service,
  url,
  config = {},
  errorNotification = false,
  successMessage = null,
  errorMessage = null,
  successNotificationType = null,
}: IRequestWithoutData) => {
  const axiosInstance = createAxiosInstance(service, config);

  try {
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
};

export const postRequest = async ({
  service,
  url,
  config = {},
  errorNotification = false,
  successMessage = null,
  errorMessage = null,
  successNotificationType = null,
  data,
}: IRequestWithData) => {
  const axiosInstance = createAxiosInstance(service, config);
  try {
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
};

export const putRequest = async ({
  service,
  url,
  config = {},
  errorNotification = false,
  successMessage = null,
  errorMessage = null,
  successNotificationType = null,
  data,
}: IRequestWithData) => {
  const axiosInstance = createAxiosInstance(service, config);
  try {
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
};

export const patchRequest = async ({
  service,
  url,
  config = {},
  errorNotification = false,
  successMessage = null,
  errorMessage = null,
  successNotificationType = null,
  data,
}: IRequestWithData) => {
  const axiosInstance = createAxiosInstance(service, config);
  try {
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
};

export const deleteRequest = async ({
  service,
  url,
  config = {},
  errorNotification = false,
  successMessage = null,
  errorMessage = null,
  successNotificationType = null,
}: IRequestWithoutData) => {
  const axiosInstance = createAxiosInstance(service, config);
  try {
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
};
