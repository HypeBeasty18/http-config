import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const useCookieListener = (cookieName: string) => {
  const [isHasCookie, setIsHasCookie] = useState<string | null>(Cookies.get(cookieName) || null);

  useEffect(() => {
    const cookieListener = () => {
      const cookie = Cookies.get(cookieName);

      if (cookie) {
        setIsHasCookie(cookie);
      } else {
        setIsHasCookie(null);
      }
    };
    cookieListener();

    const cookieCheck = setInterval(cookieListener, 1000);

    return () => {
      clearInterval(cookieCheck);
    };
  }, []);

  return { isHasCookie };
};

export default useCookieListener;
