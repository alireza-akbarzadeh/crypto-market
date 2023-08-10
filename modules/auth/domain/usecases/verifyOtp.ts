import { NextPage } from "@/core/enums/next-page.enums";
import { verifyOtpDS } from "../../data/datasources/auth.datasource";

type NextPageType = "set_name";
const NextPageMap = {
  set_name: NextPage.SetName,
};
type VerifyOtpParams = {
  code: string;
  phoneNumber: string;
  tempAuth: string;
};

export default async function verifyOtp({
  code,
  phoneNumber,
  tempAuth,
}: VerifyOtpParams) {
  const { success, result, error } = await verifyOtpDS({
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
