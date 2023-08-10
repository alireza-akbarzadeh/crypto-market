import { NextPage } from "@/core/enums/next-page.enums";
import { loginPasswordDS } from "../../data/datasources/auth.datasource";
import { AuthLoginPasswordFormValues } from "../../presentation/components/auth-password-form/auth-password-form.view";

type NextPageType = "verify_otp_login" | "home";
const NextPageMap = {
  verify_otp_login: NextPage.LoginOtp,
  home: NextPage.Home,
};

export default async function loginPassword(
  { password }: AuthLoginPasswordFormValues,
  phone: string
) {
  const { success, result, error } = await loginPasswordDS({ password, phone });

  if (!success) return { error };

  const { token, tempAuth, nextPage, time } = result;
  return {
    data: {
      token,
      tempAuth,
      time,
      nextPage: NextPageMap[nextPage as NextPageType],
    },
  };
}
