import styles from "./app-dialog.module.scss";
import React, { ReactNode } from "react";
import {
  Dialog,
  DialogProps,
  DialogContent,
  IconButton,
  useMediaQuery,
  Paper,
  Box,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import SlideUp from "../slide-up";
import CloseIcon from "@mui/icons-material/Close";
import BackIcon from "@mui/icons-material/ArrowForwardIos";
import { useIsMobileSize } from "@/core/hooks";
import Image from "next/image";
import HEADER_LOGO from "@/public/images/header-logo.svg";
import clsx from "clsx";

type PropTypes = {
  renderClose?: () => ReactNode;
  title?: string;
  closeOnOutside?: boolean;
  contentClassName?: string;
  fullScreenMobile?: boolean;
  mobileStyle?: 1 | 2 | 3 | 4;
  logoHeader?: boolean;
  headerClassName?: string;
  titleClassName?: string;
  customHeaderContent?: any;
} & DialogProps;
export default function AppDialogView(props: PropTypes) {
  const {
    onClose,
    title,
    children,
    renderClose,
    className,
    closeOnOutside,
    classes,
    contentClassName,
    fullScreenMobile = true,
    logoHeader,
    mobileStyle = 1,
    headerClassName,
    titleClassName,
    customHeaderContent,
    ...other
  } = props;
  const isMobileSize = useIsMobileSize();

  if (mobileStyle === 4 && isMobileSize) {
    return (
      <SwipeableDrawer
        // container={container}
        className={clsx(styles.root, styles["style-4"], className)}
        anchor='bottom'
        open={props.open}
        onClose={props.onClose as any}
        onOpen={() => {}}
        swipeAreaWidth={0}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: false,
        }}
        PaperProps={{
          className: clsx({
            [styles.dialogPaper]: true,
            [classes?.paper || ""]: true,
          }),
        }}
      >
        <div className={clsx(styles.bottomSheetHandler, headerClassName)} />
        <div className={clsx(styles.content, contentClassName)}>{children}</div>
      </SwipeableDrawer>
    );
  }
  return (
    <Dialog
      fullScreen={fullScreenMobile && isMobileSize}
      TransitionComponent={
        fullScreenMobile && isMobileSize ? SlideUp : undefined
      }
      fullWidth
      onClose={closeOnOutside ? onClose : undefined}
      maxWidth='sm'
      className={clsx(styles.root, styles["style-" + mobileStyle], className)}
      classes={{
        ...classes,
        paper: clsx({
          [styles.dialogPaper]: true,
          [styles.notFullScreen]: !fullScreenMobile,
          [classes?.paper || ""]: true,
        }),
      }}
      {...other}
    >
      <div className={clsx(styles.header, headerClassName)}>
        {customHeaderContent}
        {Boolean(title) && (
          <Typography
            className={clsx(styles.title, titleClassName)}
            // fontWeight={700}
            component='span'
          >
            {title}
          </Typography>
        )}
        {logoHeader && (
          <div className={styles.logo}>
            <Image src={HEADER_LOGO} />
          </div>
        )}
        <div className={styles.closeIconWrapper}>
          <IconButton onClick={onClose as any} className='mobile-up'>
            <CloseIcon />
          </IconButton>
          <div className='mobile-down'>
            {renderClose ? (
              renderClose()
            ) : (
              <IconButton onClick={onClose as any}>
                {mobileStyle === 2 ? <BackIcon /> : <CloseIcon />}
              </IconButton>
            )}
          </div>
        </div>
      </div>
      <DialogContent className={clsx(styles.content, contentClassName)}>
        <div className={styles.blurBg} />
        {children}
      </DialogContent>
    </Dialog>
  );
}
