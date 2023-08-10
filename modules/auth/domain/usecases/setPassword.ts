import { AuthSetPasswordFormValues } from "./../../presentation/components/auth-set-password-form/auth-set-password-form.view";
import { setPasswordDS } from "../../data/datasources/auth.datasource";

export default async function setPassword(
  { password }: AuthSetPasswordFormValues,
  registerToken: string
) {
  const { success, result, error } = await setPasswordDS(
    { password, confirm_password: password },
    registerToken
  );

  if (!success) return { error };

  const { token } = result;
  return {
    data: { token },
  };
}
