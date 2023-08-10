import { BottomNavigation } from "@mui/material";
import styles from "./safe-view.module.scss";

type PropTypes = { children: any };
export default function SafeViewView(props: PropTypes) {
  const { children } = props;
  return (
    <>
      {children}
      <BottomNavigation sx={{ opacity: 0, zIndex: -1 }} />
    </>
  );
}
