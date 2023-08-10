import { AuthSetPasswordFormValues } from "../../presentation/components/auth-set-password-form/auth-set-password-form.view";
import { forgetSetPasswordDS } from "../../data/datasources/auth.datasource";

export default async function forgetSetPassword(
  params: AuthSetPasswordFormValues & {
    phoneNumber: string;
    code: string;
    tempAuth: string;
  },
  registerToken: string
) {
  const { password, phoneNumber, code, tempAuth } = params;
  const { success, result, error } = await forgetSetPasswordDS(
    { password, phone: phoneNumber, code, tempAuth },
    registerToken
  );

  if (!success) return { error };

  const { token } = result;
  return {
    data: { token },
  };
}
