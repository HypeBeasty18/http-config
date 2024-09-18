import { AxiosRequestConfig } from "axios";

//типы успешных уведомлений
export type TypeSuccessNotification = "success" | "warning" | "info";

//тип еррор уведомления
export type TypeErrorNotification = "error";

// типы сервисов
export type TypeServices =
  | "workspaces"
  | "google"
  | "bim"
  | "bimv2"
  | "absolute"
  | "sarex"
  | "documentations"
  | "workflows"
  | "sarexApi"
  | "comparisons"
  | "remarks"
  | "gateway";

//типы BUILD_ENV
export type TypeEnvironment = "stage" | "prod" | "local" | "contour";

// типы хостов
export type IHosts = Partial<{
  [key in TypeServices]: Partial<Record<TypeEnvironment, string | undefined>>;
}>;

export interface IRequestBase {
  service: TypeServices;
  url: string;
  config?: AxiosRequestConfig;
  errorNotification?: boolean;
  successNotificationType?: TypeSuccessNotification | null;
  successMessage?: string | null;
  errorMessage?: string | null;
}

// Тип для запросов, не требующих `data` (GET и DELETE)
export interface IRequestWithoutData extends IRequestBase {}

// Тип для запросов, требующих `data` (POST, PUT, PATCH)
export interface IRequestWithData extends IRequestBase {
  data: any; // `data` обязательно
}

export enum TOKENS {
  ACCESS_TOKEN = "meow",
  REFRESH_TOKEN = "gaf",
}
