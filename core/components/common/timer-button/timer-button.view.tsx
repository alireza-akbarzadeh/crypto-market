import styles from "./timer-button.module.scss";
import {
  Box,
  Button,
  Typography,
  ButtonProps,
  CircularProgress,
} from "@mui/material";

type PropTypes = { timer: number; time: number } & ButtonProps;
export default function TimerButtonView(props: PropTypes) {
  const { timer, endIcon, disabled, children, time, ...other } = props;
  return (
    <Button
      endIcon={
        timer ? (
          <Box
            component="span"
            className={styles.timerContainer}
            bgcolor="primary.light"
            color="primary.contrastText"
          >
            <CircularProgress
              size={30}
              variant="determinate"
              value={(timer / time) * 100}
              className={styles.timerProgress}
            />
            <Typography component="span" className={styles.timerText}>
              {timer}
            </Typography>
          </Box>
        ) : (
          endIcon
        )
      }
      disabled={Boolean(disabled || timer)}
      {...other}
    >
      {children}
    </Button>
  );
}
