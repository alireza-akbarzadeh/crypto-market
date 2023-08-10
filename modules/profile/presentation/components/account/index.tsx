import AccountView from "./account.view";
import useUser from "@/modules/auth/domain/usecases/useUser";
import { UserInterface } from "@/modules/auth/domain/entities/user";
import { useIsDesktopSize } from "@/core/hooks";

type PropTypes = {
  user: UserInterface;
  // isDesktopSize: boolean;
  changeAvatar: () => void;
};
export default function AccountComponent(props: PropTypes) {
  const isDesktopSize = useIsDesktopSize();
  return <AccountView {...props} {...{ isDesktopSize }} />;
}
