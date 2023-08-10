import styles from "./loading-modal.module.scss";
import { Dialog, Typography } from "@mui/material";
import LoadingComponent from "../loading";

type PropTypes = {
  open: boolean;
  children?: any;
  title?: string;
  message?: string;
};
export default function LoadingModalView(props: PropTypes) {
  const { open, children, title, message } = props;
  return (
    <Dialog
      open={open}
      fullWidth
      fullScreen={false}
      maxWidth='xs'
      classes={{ paper: styles.paper }}
    >
      <div
      // className={styles.imageWrapper}
      >
        <LoadingComponent />
      </div>
      {children || (
        <>
          {title && (
            <Typography color='primary.main' className={styles.title}>
              {title}
            </Typography>
          )}
          {message && (
            <Typography className={styles.defaultMessage}>{message}</Typography>
          )}
        </>
      )}
    </Dialog>
  );
}
