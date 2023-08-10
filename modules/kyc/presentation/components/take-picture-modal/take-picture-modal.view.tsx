import AppDialogComponent from "@/core/components/common/app-dialog";
import { Button, ButtonBase, IconButton } from "@mui/material";
import clsx from "clsx";
import { useMemo } from "react";
import Webcam from "react-webcam";
import styles from "./take-picture-modal.module.scss";
import CheckIcon from "@mui/icons-material/Check";
import RetryIcon from "@mui/icons-material/Replay";

type PropTypes = {
  open: boolean;
  onClose: () => void;
  webcamRef: any;
  capture: () => void;
  isMobileSize: boolean;
  isMobileDevice: boolean;
  width: number;
  height: number;
  imageUrl?: string;
  retake: () => void;
  submit: () => void;
  openMediaAccessError: (error: any) => void;
};
export default function TakePictureModalView(props: PropTypes) {
  const {
    open,
    onClose,
    webcamRef,
    capture,
    isMobileSize,
    isMobileDevice,
    width,
    height,
    imageUrl,
    retake,
    submit,
    openMediaAccessError,
  } = props;
  const videoConstraints = useMemo(() => {
    if (!isMobileDevice) {
      if (isMobileSize) {
        return {
          height: height,
          width: width,
          aspectRatio: width / height,
          facingMode: "user",
        };
      }
      return { width: 1280, height: 720, facingMode: "user" };
    }
    if (!isMobileSize) {
      return {
        width: 1280,
        height: 720,
        facingMode: { exact: "environment" },
      };
    }
    if (width > height) {
      return {
        height: height,
        width: width,
        aspectRatio: width / height,
        facingMode: { exact: "environment" },
      };
    }
    return {
      height: width,
      width: height,
      aspectRatio: height / width,
      facingMode: { exact: "environment" },
    };
  }, [width, height, isMobileSize, isMobileDevice]);

  return (
    <AppDialogComponent
      classes={{ paper: styles.paper }}
      closeOnOutside={false}
      className={styles.root}
      open={open}
      onClose={onClose}
      title="ارسال تصویر کارت ملی"
      mobileStyle={3}
      headerClassName={styles.header}
    >
      <div className={styles.webcamContainer}>
        <div className={styles.placeholder}>
          {open && (
            <Webcam
              className={styles.webcam}
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/webp"
              // forceScreenshotSourceSize
              // minScreenshotHeight={1920}
              // minScreenshotWidth={1920}
              // imageSmoothing={false}
              screenshotQuality={1}
              width={isMobileSize ? width : "100%"}
              height={isMobileSize ? height : undefined}
              videoConstraints={videoConstraints}
              style={{ opacity: imageUrl ? 0 : 1 }}
              onUserMediaError={openMediaAccessError}
            />
          )}
          {Boolean(imageUrl) && (
            <div className={styles.takenImage}>
              <img className={styles.takenImage} src={imageUrl} />
            </div>
          )}
        </div>
      </div>
      <div className={styles.hole} />
      <div className={clsx(styles.footer, "mobile-down")}>
        {imageUrl ? (
          <>
            <IconButton className={styles.btn} onClick={submit}>
              <CheckIcon />
            </IconButton>
            <IconButton className={styles.btn} onClick={retake}>
              <RetryIcon />
            </IconButton>
          </>
        ) : (
          <ButtonBase onClick={capture} className={styles.shutter} />
        )}
      </div>
      <div className={clsx(styles.footer, "mobile-up")}>
        {imageUrl ? (
          <>
            <Button
              onClick={retake}
              className={styles.btn}
              variant="outlined"
              fullWidth
            >
              تلاش دوباره
            </Button>
            <Button
              onClick={submit}
              className={styles.btn}
              variant="contained"
              fullWidth
            >
              ارسال
            </Button>
          </>
        ) : (
          <Button
            onClick={capture}
            className={styles.shutter}
            variant="contained"
            fullWidth
          >
            ثبت تصویر
          </Button>
        )}
      </div>
    </AppDialogComponent>
  );
}
