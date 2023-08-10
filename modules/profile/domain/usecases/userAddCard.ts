import { userAddCardDS } from "../../data/datasources/profile.datasource";

export default async function userAddCard(trackId: string) {
  const { success, error, message } = await userAddCardDS({
    track_id: trackId,
  });
  if (!success) return { error };
  return { data: message };
}
