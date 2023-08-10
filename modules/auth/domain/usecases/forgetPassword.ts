import { NextPage } from "@/core/enums/next-page.enums";
import { forgetPasswordDS } from "../../data/datasources/auth.datasource";

type NextPageType = "verify_otp_forget_password";
const NextPageMap = {
  verify_otp_forget_password: NextPage.ForgetOtp,
};

export default async function forgetPassword(phoneNumber: string) {
  const { success, result, error } = await forgetPasswordDS(phoneNumber);

  if (!success) return { error };

  const { tempAuth, nextPage, time } = result;
  const data = {
    tempAuth,
    nextPage: NextPageMap[nextPage as NextPageType],
    time,
  };

  return { data, error };
}
