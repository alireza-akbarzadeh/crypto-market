import { userDeleteIbanDS } from "../../data/datasources/profile.datasource";

export default async function userDeleteIban(ibanId: string) {
  const { success, result, error, message } = await userDeleteIbanDS(ibanId);
  if (error) return { error };
  return { data: message };
}
