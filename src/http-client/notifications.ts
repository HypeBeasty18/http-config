import { toast } from "../notifications";
import { TypeErrorNotification, TypeSuccessNotification } from "./types";

interface IShowNotification {
  type: TypeSuccessNotification | TypeErrorNotification;
  message: string;
}
// функция отображает уведомление исходя из типа уведомления и сообщения
export const showNotification = ({ type, message }: IShowNotification) => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "info":
      toast.info(message);
      break;
    case "warning":
      toast.warning(message);
      break;
    default:
      toast.success(message);
  }
};
