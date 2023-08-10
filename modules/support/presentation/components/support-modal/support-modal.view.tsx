import SlideUp from "@/core/components/common/slide-up";
import { Dialog, Paper } from "@mui/material";
import SupportContentComponent from "../support-content";
import styles from "./support-modal.module.scss";

type PropTypes = {
  isMobileSize: boolean;
  open: boolean;
};
export default function SupportModalView(props: PropTypes) {
  const { isMobileSize, open, ...other } = props;

  if (isMobileSize) {
    return (
      <Dialog
        fullScreen
        TransitionComponent={SlideUp}
        fullWidth
        open={open}
        PaperProps={{ className: styles.paper }}
        {...other}
        TransitionProps={{ tabIndex: "null" } as any}
      >
        <SupportContentComponent />
      </Dialog>
    );
  }
  return (
    <SlideUp {...other} in={open}>
      <div className={styles.modal}>
        <Paper className={styles.paper}>
          <SupportContentComponent />
        </Paper>
      </div>
    </SlideUp>
  );
}
