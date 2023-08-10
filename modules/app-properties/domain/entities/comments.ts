export interface CommentInterface {
  message: string;
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
    fullName: string;
    avatar: string;
    createAt: string;
  };
  replies: {
    message: string;
    createdAt: string;
  }[];
}
