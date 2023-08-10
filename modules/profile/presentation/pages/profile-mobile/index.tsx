import ProfileMobileView from "./profile-mobile.view";
import useUser from "@/modules/auth/domain/usecases/useUser";
import { useDispatch, useSelector, useToggleTheme } from "@/core/hooks";
import useLogout from "@/modules/auth/domain/usecases/useLogout";
import useAppInitials from "@/modules/_app/domain/usecases/useAppInitials";
import { openAlert } from "@/modules/_app/presentation/redux";
import { LogoutBoxRLineIcon } from "@/core/components/common/remixicons";
import useWallet from "@/modules/wallet/domain/usecases/useWallet";

type PropTypes = {};
export default function ProfileMobilePage(props: PropTypes) {
  const { user } = useUser();
  const { data: appInitials } = useAppInitials();
  const { isDarkTheme } = useSelector((s) => s.app);
  const { data } = useWallet();
  const toggleTheme = useToggleTheme();
  const dispatch = useDispatch();
  const doLogout = useLogout();

  const logout = () => {
    dispatch(
      openAlert({
        // title,
        title: "آیا میخواهید از حساب کاربری خود خارج شوید؟",
        // variant,
        icon: <LogoutBoxRLineIcon color="error" fontSize="large" />,
        actionButtons: [
          {
            title: "نه",
            variant: "outlined",
            handler: (close: any) => close(),
          },
          {
            title: "خروج از حساب",
            variant: "contained",
            handler: (close: any) => {
              doLogout();
              close();
            },
          },
        ],
      })
    );
  };

  return (
    <ProfileMobileView
      {...{
        user,
        isDarkTheme,
        toggleTheme,
        logout,
        appInitials,
        balance: (data as any).balance,
      }}
    />
  );
}
