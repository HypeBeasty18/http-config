import axios from "axios";

import Cookies from "js-cookie";
import { TOKENS } from "../types";

interface IGetNewsTokens {
  access: string;
}

const URL = "https://stage.sarex.io/api/token/refresh";

// сервис на ревалидаци access
export const AuthService = {
  async getNewAccessToken(refresh: string) {
    const response = await axios.post<IGetNewsTokens>(URL, {
      [TOKENS.REFRESH_TOKEN]: refresh,
    });

    Cookies.set(TOKENS.ACCESS_TOKEN, response.data.access);
  },
};
