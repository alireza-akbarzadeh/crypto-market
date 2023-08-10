import { userDeleteCardDS } from "../../data/datasources/profile.datasource";

export default async function userDeleteCard(cardId: string) {
  const { success, result, error, message } = await userDeleteCardDS(cardId);
  if (error) return { error };
  return { data: message };
}
