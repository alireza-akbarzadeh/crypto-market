import { ProfileAvatar } from "../../domain/entities/avatar";

export default function profileAvatarModelMapper(
  data: any
): ProfileAvatar | undefined {
  if (!data) return;
  const { id, avatar } = data;
  return { avatar, id: `${id}` };
}
