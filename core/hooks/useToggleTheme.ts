import { toggleTheme } from "@/modules/_app/presentation/redux";
import { useDispatch, useSelector } from "@/core/hooks";

export default function useToggleTheme() {
  const dispatch = useDispatch();
  const { isDarkTheme } = useSelector((s) => s.app);
  return () => {
    localStorage.setItem("theme", isDarkTheme ? "light" : "dark");
    dispatch(toggleTheme());
  };
}
