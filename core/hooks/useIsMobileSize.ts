import { useMediaQuery, useTheme } from "@mui/material";

export default function useIsMobileSize() {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down("sm"), { noSsr: true });
}
