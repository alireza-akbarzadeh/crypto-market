import { changePasswordDS } from "../../data/datasources/auth.datasource";
import { AuthChangePasswordFormValues } from "../../presentation/components/change-password-modal/change-password-modal.view";

export default async function changePassword(
  model: AuthChangePasswordFormValues
) {
  const { password, oldPassword } = model;
  const { success, message, error } = await changePasswordDS({
    password,
    old_password: oldPassword,
  });

  if (!success) return { error };

  return { data: message, error };
}
