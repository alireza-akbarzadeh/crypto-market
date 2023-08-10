import { userAddIbanDS } from "../../data/datasources/profile.datasource";

export default async function userAddIban(trackId: string) {
  const { success, error, message } = await userAddIbanDS({
    track_id: trackId,
  });
  if (!success) return { error };
  return { data: message };
}
