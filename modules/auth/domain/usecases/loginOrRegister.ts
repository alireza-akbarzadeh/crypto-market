import { NextPage } from "@/core/enums/next-page.enums";
import { loginOrRegisterDS } from "../../data/datasources/auth.datasource";

type NextPageType = "login_password" | "verify_otp_register";
const NextPageMap = {
  login_password: NextPage.LoginPassword,
  verify_otp_register: NextPage.RegisterOtp,
};

export default async function loginOrRegister(phoneNumber: string) {
  const { success, result, error } = await loginOrRegisterDS(phoneNumber);

  if (!success) return { error };

  const { tempAuth, nextPage, time } = result;
  const data = {
    tempAuth,
    nextPage: NextPageMap[nextPage as NextPageType],
    time,
  };

  return { data, error };
}
