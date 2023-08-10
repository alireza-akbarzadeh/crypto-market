import { Typography, Tooltip, ClickAwayListener } from "@mui/material";
import styles from "./custom-tooltip.module.scss";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

type PropTypes = {
  children: any;
  title: any;
  open: boolean;
  handleClose: () => void;
  handleOpen: () => void;
};
export default function CustomTooltipView(props: PropTypes) {
  const { children, title, open, handleClose, handleOpen } = props;
  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Tooltip
        onClick={open ? handleClose : undefined}
        PopperProps={{
          disablePortal: true,
        }}
        onClose={handleClose}
        open={open}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        placement="top-start"
        title={title}
      >
        <Typography
          className={styles.text}
          component="span"
          // color="primary"
          // sx={{ borderColor: "primary" }}
        >
          {children}
          <HelpOutlineIcon className={styles.icon} onClick={handleOpen} />
        </Typography>
      </Tooltip>
    </ClickAwayListener>
  );
  // return (
  //   <Tooltip placement="top-start" title={title}>
  //     <Typography
  //       className={styles.text}
  //       component="span"
  //       color="primary"
  //       sx={{ borderColor: "primary" }}
  //     >
  //       {children}
  //     </Typography>
  //   </Tooltip>
  // );
}
