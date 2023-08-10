import { CommentInterface } from "./../../domain/entities/comments";

export default function commentModelMapper(data: any): CommentInterface {
  const { body, createdAt, user, replies } = data;
  return {
    message: body,
    createdAt,
    user: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      fullName: `${user?.firstName} ${user?.lastName}`,
      avatar: user?.avatar?.avatarUrl,
      createAt: user?.createAt,
    },
    replies: (replies || []).map((r: any) => ({
      message: r?.body,
      createdAt: r?.createdAt,
    })),
  };
}
