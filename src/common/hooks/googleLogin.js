import { useGoogleLogin } from "@react-oauth/google";
import { useContext } from "react";
import { GoogleContext } from "@/common/context";

export const useGoogleLoginHook = () => {
  const { dispatch } = useContext(GoogleContext);

  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: (tokenResponse) => {
      // Dispatch login success action
      dispatch({ type: "LOGIN_SUCCESS", payload: tokenResponse });
    },
    onError: (error) => {
      console.error("Login Failed:", error);
    },
    onAutoLogin: () => {
      console.log("Auto Login");
    },
    ux_mode: "redirect",
    redirect_uri: "http://localhost:5173/oauth/google",
  });

  return login;
};
