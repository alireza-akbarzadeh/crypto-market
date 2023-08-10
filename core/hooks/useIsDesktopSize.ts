import { useMediaQuery, useTheme } from "@mui/material";

export default function useIsDesktopSize() {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.up("md"), { noSsr: true });
}
