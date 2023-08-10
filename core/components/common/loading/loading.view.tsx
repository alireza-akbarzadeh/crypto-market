import styles from "./loading.module.scss";
import { Box, BoxProps } from "@mui/material";
import clsx from "clsx";
import AppHeaderComponent from "../../layouts/app-header";

type PropTypes = {
  fullScreen?: boolean;
  loading?: boolean;
  page?: boolean;
} & BoxProps;
export default function LoadingView(props: PropTypes) {
  const { fullScreen, loading, children, className, page, ...other } = props;

  if (loading === false) return null;

  if (page) {
    return (
      <LoadingView fullScreen>
        <AppHeaderComponent />
      </LoadingView>
    );
  }

  if (fullScreen) {
    return (
      <Box
        className={clsx(styles.root, styles.fullscreen, className)}
        {...other}
      >
        {children}
        <LoadingElement />
      </Box>
    );
  }
  return (
    <Box className={clsx(styles.root, className)} {...other}>
      {children}
      <LoadingElement />
    </Box>
  );
}

function LoadingElement() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingElement}>
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
