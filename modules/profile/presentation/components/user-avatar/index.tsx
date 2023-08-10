import { UserInterface } from "@/modules/auth/domain/entities/user";
import useUser from "@/modules/auth/domain/usecases/useUser";
import UserAvatarView from "./user-avatar.view";

type PropTypes = {
  user: UserInterface;
  className?: string;
  onClick?: () => void;
};
export default function UserAvatarComponent(props: PropTypes) {
  return <UserAvatarView {...props} />;
}
