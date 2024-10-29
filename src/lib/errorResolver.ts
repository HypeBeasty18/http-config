import { TypeServices } from "../types";

type HTTPErrorResolver = (code: number) => string;
type HTTPCodeMapping = Record<number, HTTPErrorResolver>;

export type ServiceNameMapping = Record<TypeServices, string>;

const serviceToName: ServiceNameMapping = {
  workspaces: "Сервис рабочих областей",
  google: "Сервис хранения данных",
  bim: "Сервис BIM",
  bimv2: "Сервис BIM_V2",
  absolute: "Сервис",
  sarex: "Локальный сервис данных",
  documentations: "Сервис документации",
  workflows: "Сервис обработки документов",
  sarexApi: "Сервис данных",
  comparisons: "Сервис сравнений",
  remarks: "Сервис замечаний",
  gateway: "Сервис gateway",
  projects: "Сервис проектов",
};

// вывод ошибки исходя из кода
export const httpCodeToError: HTTPCodeMapping = {
  400: (code) => `Некорректный формат запроса, ошибка ${code}`,
  404: (code) => `Ресурс не найден, ошибка ${code}`,
  500: (code) => `Ошибка сервера, ошибка ${code}`,
};

// вывод ошибки по сервису
const resolveNetworkError = (service: TypeServices, err: any) => {
  const serviceName = serviceToName[service];
  const errorMessage = `${err.name}: ${err.message}`;
  return `${serviceName} вернул ошибку: ${errorMessage}.`;
};

// вывод ошибки по коду
const resolveMessageByCode = (code: number) => {
  if (httpCodeToError[code]) {
    return httpCodeToError[code](code);
  }
  if (code >= 400 && code < 500 && httpCodeToError[400]) {
    return httpCodeToError[400](code);
  }
  if (httpCodeToError[500]) {
    return httpCodeToError[500](code);
  }
};

const resolveNetworkErrorByCode = (service: TypeServices, code: number) => {
  const serviceName = serviceToName[service];
  const errorMessage = resolveMessageByCode(code);
  return `${serviceName} вернул ошибку: ${errorMessage}.`;
};

export { resolveNetworkErrorByCode, resolveNetworkError };
