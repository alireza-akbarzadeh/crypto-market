import { SupportIcon } from "@/core/components/common/custom-icon";
import { Fab } from "@mui/material";
import styles from "./support-fab.module.scss";

type PropTypes = { onClick: () => void };
export default function SupportFabView(props: PropTypes) {
  const { onClick } = props;
  return (
    <Fab
      onClick={onClick}
      component="span"
      color="primary"
      size="large"
      className={styles.supportButton}
      // className="wave-button"
      aria-label="پشتیبانی"
    >
      <SupportIcon className={styles.supportIcon} />
      <div className="dot-typing">
        <span />
        <span />
        <span />
      </div>
    </Fab>
  );
}
