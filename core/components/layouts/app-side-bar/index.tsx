import {
  useDispatch,
  useIsPwa,
  useSelector,
  useToggleTheme,
} from "@/core/hooks";
import useLogout from "@/modules/auth/domain/usecases/useLogout";
import useUser from "@/modules/auth/domain/usecases/useUser";
import { openLoginModal } from "@/modules/auth/presentation/redux";
import useAppInitials from "@/modules/_app/domain/usecases/useAppInitials";
import { useRouter } from "next/router";
import AppSideBarView from "./app-side-bar.view";

type PropTypes = {
  open: boolean;
  onClose: () => void;
};
export default function AppSideBarComponent(props: PropTypes) {
  const dispatch = useDispatch();
  const { isDarkTheme } = useSelector((s) => s.app);
  const { user } = useUser();
  const { data: appInitials } = useAppInitials();
  const toggleTheme = useToggleTheme();
  const router = useRouter();
  const logout = useLogout();
  const isStandalone = useIsPwa();

  return (
    <AppSideBarView
      {...props}
      {...{
        logout,
        isDarkTheme,
        toggleTheme,
        pathname: router.pathname,
        openLoginModal: () => dispatch(openLoginModal()),
        user,
        appInitials,
        isStandalone,
      }}
    />
  );
}
