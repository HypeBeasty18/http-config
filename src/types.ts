import { AxiosRequestConfig } from "axios";

//типы успешных уведомлений
type TypeSuccessNotification = "success" | "warning" | "info";

//тип еррор уведомления
type TypeErrorNotification = "error";

// типы сервисов
type TypeServices =
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
type TypeEnvironment = "stage" | "prod" | "local" | "contour";

// типы хостов
type IHosts = {
  [key in TypeServices]: Record<TypeEnvironment, string | undefined>;
};

interface IRequestBase {
  service: TypeServices;
  url: string;
  config?: AxiosRequestConfig;
  errorNotification?: boolean;
  successNotificationType?: TypeSuccessNotification | null;
  successMessage?: string | null;
  errorMessage?: string | null;
}

// Тип для запросов, не требующих `data` (GET и DELETE)
interface IRequestWithoutData extends IRequestBase {}

// Тип для запросов, требующих `data` (POST, PUT, PATCH)
interface IRequestWithData extends IRequestBase {
  data: any; // `data` обязательно
}

export type {
  TypeSuccessNotification,
  TypeErrorNotification,
  TypeServices,
  IRequestWithoutData,
  IRequestWithData,
  TypeEnvironment,
  IHosts,
};
