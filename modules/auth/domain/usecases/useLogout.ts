import { useDispatch } from "@/core/hooks";
import { setToken } from "@/modules/auth/presentation/redux";
import { revokeTokenDS } from "../../data/datasources/auth.datasource";

export default function useLogout() {
  const dispatch = useDispatch();
  return (skipRevoke?: boolean) => {
    if (skipRevoke !== true) revokeTokenDS();
    dispatch(setToken(""));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };
}
