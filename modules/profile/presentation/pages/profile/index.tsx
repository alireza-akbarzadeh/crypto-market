import {
  useDispatch,
  useIsDesktopSize,
  useSelector,
  useToggleTheme,
  useUpdateEffect,
} from "@/core/hooks";
import useLogout from "@/modules/auth/domain/usecases/useLogout";
import useUser from "@/modules/auth/domain/usecases/useUser";
import ChangePasswordModalComponent from "@/modules/auth/presentation/components/change-password-modal";
import { openLoginModal } from "@/modules/auth/presentation/redux";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState, useMemo } from "react";
import ProfileView, { ProfileTabs } from "./profile.view";
// import AvatarModalComponent from "../../components/avatar-modal";
const AvatarModalComponent = dynamic(
  () => import("../../components/avatar-modal"),
  { ssr: false }
);

type PropTypes = {
  tab: ProfileTabs;
};
export default function ProfilePage(props: PropTypes) {
  const { tab } = props;
  // const [state, setState] = useState<ProfileTabs>(tab || ProfileTabs.Account);
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const isDesktopSize = useIsDesktopSize();
  const { user, userLoading } = useUser();
  const { isDarkTheme } = useSelector((s) => s.app);
  const dispatch = useDispatch();
  const toggleTheme = useToggleTheme();
  const logout = useLogout();
  const router = useRouter();

  const handleState = (state: ProfileTabs) => {
    router.replace("/profile/" + state, undefined, { shallow: true });
  };

  return (
    <>
      <ProfileView
        {...{
          user,
          userLoading,
          isDarkTheme,
          state: tab,
          setState: handleState,
          openLoginModal: () => dispatch(openLoginModal()),
          toggleTheme,
          isDesktopSize,
          logout,
          changeAvatar: () => setAvatarModalOpen(true),
          openPasswordChange: () => setChangePasswordOpen(true),
        }}
      />
      <AvatarModalComponent
        open={avatarModalOpen}
        onClose={() => setAvatarModalOpen(false)}
      />
      <ChangePasswordModalComponent
        open={changePasswordOpen}
        onClose={() => setChangePasswordOpen(false)}
      />
    </>
  );
}
