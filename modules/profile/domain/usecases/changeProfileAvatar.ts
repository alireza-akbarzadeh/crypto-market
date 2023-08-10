import { changeProfileAvatarDS } from "../../data/datasources/profile.datasource";

export default async function changeProfileAvatar(id: string) {
  const { message, error } = await changeProfileAvatarDS({
    avatar_id: id,
  });
  return { data: message, error };
}
