import axios from "axios";
import { TOKENS } from "../config/types";
import Cookies from "js-cookie";

interface IGetNewsTokens {
  access: string;
}

const URL = "https://stage.sarex.io/api/refresh";

// сервис на ревалидаци access
export const AuthService = {
  async getNewAccessToken(refresh: string) {
    const response = await axios.post<IGetNewsTokens>(URL, {
      [TOKENS.REFRESH_TOKEN]: refresh,
    });

    Cookies.set("access", response.data.access);
  },
};
