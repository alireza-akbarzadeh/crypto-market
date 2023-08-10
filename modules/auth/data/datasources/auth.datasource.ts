import { useFetch, useSelector } from "@/core/hooks";
import http from "@/core/http";
import { DefaultFetchConfig } from "@/core/constants/types";

export function useUserDS(config?: DefaultFetchConfig) {
  const { token } = useSelector((state) => state.auth);
  return useFetch(token ? "/user/profile" : null, {
    revalidateOnFocus: false, //true
    revalidateOnMount: false, //true
    // revalidateOnReconnect: false, //true
    // refreshWhenOffline: false, //false
    // refreshWhenHidden: false, //false
    // refreshInterval: 0, //disabled = 0
    ...config,
  });
}

export async function loginOrRegisterDS<T = any>(phone: string) {
  return http.post<T, { phone: string }>("/authentication/registerOrLogin", {
    phone,
  });
}

type VerifyOtpParams = {
  phone: string;
  tempAuth: string;
  code: string;
};
export async function verifyOtpDS<T = any>(model: VerifyOtpParams) {
  return http.post<T>("/authentication/verifyOtp", model);
}

type setNameParams = { first_name: string; last_name: string };
export async function setNameDS<T = any>(model: setNameParams, token: string) {
  return http.post<T>("/authentication/setName", model, {
    headers: { Authorization: "Bearer " + token },
  });
}

type setPasswordParams = { password: string; confirm_password: string };
export async function setPasswordDS<T = any>(
  model: setPasswordParams,
  token: string
) {
  return http.post<T>("/authentication/setPassword", model, {
    headers: { Authorization: "Bearer " + token },
  });
}

type loginPasswordParams = { password: string; phone: string };
export async function loginPasswordDS<T = any>(model: loginPasswordParams) {
  return http.post<T>("/authentication/loginApply", model);
}

type verifyLoginOtpParams = {
  password: string;
  phone: string;
  tempAuth: string;
  code: string;
};
export async function verifyLoginOtpDS<T = any>(model: verifyLoginOtpParams) {
  return http.post<T>("/authentication/loginApply/otp", model);
}

export async function forgetPasswordDS<T = any>(phone: string) {
  return http.post<T, { phone: string }>("/authentication/forgetPassword", {
    phone,
  });
}

type VerifyForgetOtpParams = {
  phone: string;
  tempAuth: string;
  code: string;
};
export async function verifyForgetOtpDS<T = any>(model: VerifyForgetOtpParams) {
  return http.post<T>("/authentication/forgetPassword/verify", model);
}

type forgetSetPasswordParams = {
  phone: string;
  code: string;
  password: string;
  tempAuth: string;
};
export async function forgetSetPasswordDS<T = any>(
  model: forgetSetPasswordParams,
  token: string
) {
  return http.post<T>("/authentication/forgetPassword/setNewPassword", model, {
    headers: { Authorization: "Bearer " + token },
  });
}
type changePasswordParams = {
  old_password: string;
  password: string;
};
export async function changePasswordDS<T = any>(model: changePasswordParams) {
  return http.post<T>("/authentication/applyChangePassword", model);
}
export async function revokeTokenDS() {
  return http.post("/authentication/logout");
}
