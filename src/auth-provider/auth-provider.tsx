import React from "react";

import { COOKIES } from "../types";
import { AuthForm } from "./auth-form";
import useCookieListener from "./cookies-listeners";
import { useHistory } from "react-router-dom";
import HttpService from "../axiosConfig";

interface IProps {
  children: React.ReactNode;
  useFetch: HttpService;
}

const AuthProvider = ({ children, useFetch }: IProps) => {
  const { isHasCookie } = useCookieListener(COOKIES.REFRESH_TOKEN);

  const history = useHistory();

  React.useEffect(() => {
    if (!isHasCookie) {
      history.push("/");
    }
  }, [isHasCookie, history]);

  return !!isHasCookie ? <>{children}</> : <AuthForm useFetch={useFetch} />;
};

export default AuthProvider;
