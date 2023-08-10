import { verifyLoginOtpDS } from "../../data/datasources/auth.datasource";

export default async function verifyLoginOtp({
  password,
  phoneNumber,
  tempAuth,
  code,
}: {
  password: string;
  phoneNumber: string;
  tempAuth: string;
  code: string;
}) {
  const { success, result, error } = await verifyLoginOtpDS({
    password,
    phone: phoneNumber,
    tempAuth,
    code,
  });

  if (!success) return { error };

  const { token } = result;
  return {
    data: { token },
  };
}
