import { useDispatch } from "react-redux";
import { useEffect } from "react";
import useSelector from "@/core/hooks/useSelector";
import { themeDark, themeLight } from "@/core/theme";
import { useRouter } from "next/router";
import { setTheme } from "@/modules/_app/presentation/redux";

export default function useAppTheme() {
  const { isDarkTheme } = useSelector((s) => s.app);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const { dark } = router.query;
    if (!dark) return;
    dispatch(setTheme(dark === "true" ? "dark" : "light"));
  }, [router.query.dark]);
  useEffect(() => {
    const doc = document?.documentElement;
    if (doc) {
      document.documentElement.setAttribute(
        "data-theme",
        isDarkTheme ? "dark" : "light"
      );
    }
  }, [isDarkTheme]);
  if (isDarkTheme) return themeDark;
  return themeLight;
}
