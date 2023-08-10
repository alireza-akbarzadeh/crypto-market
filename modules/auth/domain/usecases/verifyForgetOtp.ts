import { NextPage } from "@/core/enums/next-page.enums";
import { verifyForgetOtpDS } from "../../data/datasources/auth.datasource";

type NextPageType = "set_password";
const NextPageMap = {
  set_password: NextPage.ForgetSetPassword,
};
type VerifyOtpParams = {
  code: string;
  phoneNumber: string;
  tempAuth: string;
};

export default async function verifyForgetOtp({
  code,
  phoneNumber,
  tempAuth,
}: VerifyOtpParams) {
  const { success, result, error } = await verifyForgetOtpDS({
    code,
    tempAuth,
    phone: phoneNumber,
  });

  if (!success) return { error };

  const { nextPage, token } = result;
  return {
    data: { nextPage: NextPageMap[nextPage as NextPageType], token },
  };
}
