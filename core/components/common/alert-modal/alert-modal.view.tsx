import styles from "./alert-modal.module.scss";
import {
  Button,
  ButtonProps,
  Dialog,
  Drawer,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import warningStatusIcon from "@/public/icons/status-warning.svg";
import successStatusIcon from "@/public/icons/status-success.svg";
import errorStatusIcon from "@/public/icons/status-error.svg";
import Image from "next/image";
import TimerButton from "../timer-button";
import { useMemo } from "react";
import { TrashIcon } from "../custom-icon";
import LoadingButton from "../loading-button";
import { useIsMobileSize } from "@/core/hooks";

export type ActionButtonProps = {
  title?: string;
  handler?: (close: () => void) => void;
  time?: number;
} & ButtonProps;
export type AlertVariant = "warning" | "success" | "error" | "delete";

type PropTypes = {
  open: boolean;
  onClose: () => void;
  children?: any;
  variant?: AlertVariant;
  message?: string;
  title?: string;
  actionButtons?: ActionButtonProps[];
  skipCloseIcon?: boolean;
  htmlMessage?: boolean;
  icon?: any;
};
export default function AlertModalView(props: PropTypes) {
  const {
    open,
    onClose,
    children,
    variant,
    message,
    actionButtons = [],
    skipCloseIcon,
    htmlMessage,
    title,
    icon: Icon,
    ...other
  } = props;
  const isMobileSize = useIsMobileSize();

  const icon = useMemo(() => {
    if (Icon) {
      return Icon;
    }
    switch (variant) {
      case "success":
        return <Image src={successStatusIcon} />;
      case "error":
        return <Image src={errorStatusIcon} />;
      case "delete":
        return <TrashIcon color='error' className={styles.icon} />;
      default:
        return <Image src={warningStatusIcon} />;
    }
  }, [variant]);
  const Wrapper = useMemo(() => {
    if (isMobileSize) {
      return ({ children }: any) => (
        <Drawer
          anchor='bottom'
          open={open}
          // onClose={() => {}}
          classes={{ root: styles.root, paper: styles.paper }}
          {...other}
        >
          {children}
        </Drawer>
      );
    }
    return ({ children }: any) => (
      <Dialog
        open={open}
        // onClose={onClose}
        fullWidth
        fullScreen={false}
        classes={{ root: styles.root, paper: styles.paper }}
        {...other}
      >
        {children}
      </Dialog>
    );
  }, [isMobileSize, open]);

  return (
    <Wrapper>
      {!skipCloseIcon && (
        <IconButton onClick={onClose} className={styles.close}>
          <CloseIcon fontSize='large' />
        </IconButton>
      )}
      <div className={styles.imageWrapper}>{icon}</div>
      {children || (
        <>
          {Boolean(title) && (
            <Typography className={styles.title}>{title}</Typography>
          )}
          {message &&
            (htmlMessage ? (
              <Typography
                className={styles.defaultMessage}
                dangerouslySetInnerHTML={{ __html: message }}
              />
            ) : (
              <Typography className={styles.defaultMessage}>
                {message}
              </Typography>
            ))}
          <div className={styles.action}>
            {actionButtons.map(({ title, handler, time, ...other }, idx) => {
              const ButtonComponent = time ? TimerButton : LoadingButton;
              return (
                <ButtonComponent
                  className={
                    actionButtons.length > 1
                      ? styles.actionButton
                      : styles.singleActionButton
                  }
                  time={time as any}
                  key={idx}
                  variant='contained'
                  onClick={handler ? () => handler(onClose) : onClose}
                  {...other}
                >
                  {title || "متوجه شدم"}
                </ButtonComponent>
              );
            })}
          </div>
        </>
      )}
    </Wrapper>
  );
}
