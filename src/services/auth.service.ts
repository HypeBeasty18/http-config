import axios from "axios";
import { setTokens } from "../config/configState";

interface INewTokens {
  refresh: string;
  access: string;
}

// сервис на запрос токенов
export const AuthService = {
  async getNewsTokens() {
    const reponse = await axios.get<INewTokens>("https://stage.sarex.io/api/token/me");

    if (reponse.data.access) {
      setTokens(reponse.data);
    }
  },
};
