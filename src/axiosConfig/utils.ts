import { AxiosError } from "axios";
import { resolveNetworkError, resolveNetworkErrorByCode } from "../lib/errorResolver";
import { TypeServices } from "../types";

// Расширяем интерфейс AxiosError для добавления поля errMessage
interface ExtendedAxiosError extends AxiosError {
  errMessage?: string;
}

// Функция для создания расширенного объекта ошибки
const createErrorObject = (
  service: TypeServices,
  error: AxiosError,
  status?: number
): ExtendedAxiosError => {
  const errMessage =
    status && status > 400 && status !== 404
      ? resolveNetworkErrorByCode(service, status)
      : resolveNetworkError(service, error.message);

  // Добавляем поле errMessage к стандартному объекту ошибки
  return {
    ...error,
    errMessage,
  } as ExtendedAxiosError;
};

export { createErrorObject };
