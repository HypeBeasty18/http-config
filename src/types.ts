import { UseQueryOptions } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { z } from "zod";

//типы успешных уведомлений
export type TypeSuccessNotification = "success" | "warning" | "info";

//тип еррор уведомления
export type TypeErrorNotification = "error";

// типы сервисов
export type TypeServices =
  | "sarex"
  | "sarexApi"
  | "gateway"
  | "workspaces"
  | "google"
  | "bim"
  | "bimv2"
  | "documentations"
  | "workflows"
  | "comparisons"
  | "remarks"
  | "projects"
  | "absolute";

//типы BUILD_ENV
export type TypeEnvironment = "stage" | "prod" | "local" | "contour";

// типы хостов
export type IHosts = {
  local?: {
    hosts: Record<TypeServices, string>;
  };
  stage?: {
    hosts: Record<TypeServices, string>;
  };
  prod?: {
    hosts: Record<TypeServices, string>;
  };
  contour?: {
    hosts: Record<TypeServices, string>;
  };
};

export interface IRequestBase {
  service: TypeServices;
  url: string;
  config?: AxiosRequestConfig;
  isCSRF?: boolean;
  schema?: z.ZodSchema;
  errorNotification?: boolean;
  successNotificationType?: TypeSuccessNotification | null;
  successMessage?: string | null;
  errorMessage?: string | null;
}

// Тип для запросов, не требующих `data` (GET и DELETE)
export interface IRequestWithoutData extends IRequestBase {
  cache?: boolean;
  invalidate?: boolean;
  queryKey?: string[];
  queryOptions?: UseQueryOptions;
}

// Тип для запросов, требующих `data` (POST, PUT, PATCH)
export interface IRequestWithData extends IRequestBase {
  data: any; // `data` обязательно
}

export enum COOKIES {
  ACCESS_TOKEN = "meow",
  REFRESH_TOKEN = "gaf",
  CSRF = "csrftoken",
}
