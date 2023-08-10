import AppDialogComponent from "@/core/components/common/app-dialog";
import {
  Button,
  ButtonBase,
  IconButton,
  CircularProgress,
  Typography,
} from "@mui/material";
import clsx from "clsx";
import Webcam from "react-webcam";
import styles from "./record-video-modal.module.scss";
import CheckIcon from "@mui/icons-material/Check";
import RetryIcon from "@mui/icons-material/Replay";
import PlayIcon from "@mui/icons-material/PlayCircleOutline";
import { UserInterface } from "@/modules/auth/domain/entities/user";

type PropTypes = {
  open: boolean;
  webcamRef: any;
  onClose: () => void;
  retake: () => void;
  submit: () => void;
  startRecording: () => void;
  stopRecording: () => void;
  setPaused: () => void;
  onPlay: () => void;
  url?: string;
  capturing: boolean;
  videoRef: any;
  notSupported: boolean;
  isPlaying: boolean;
  mimeType?: string;
  previewUrl?: string;
  user?: UserInterface;
  openMediaAccessError: (error: any) => void;
};
export default function RecordVideoModalView(props: PropTypes) {
  const {
    open,
    onClose,
    retake,
    submit,
    startRecording,
    stopRecording,
    webcamRef,
    url,
    capturing,
    videoRef,
    onPlay,
    notSupported,
    isPlaying,
    setPaused,
    mimeType,
    previewUrl,
    user,
    openMediaAccessError,
  } = props;

  const renderRecordBtn = () => {
    return (
      <ButtonBase
        onClick={capturing ? stopRecording : startRecording}
        className={clsx({
          [styles.shutter]: true,
          [styles.recording]: capturing,
        })}
      />
    );
  };
  return (
    <AppDialogComponent
      classes={{ paper: styles.paper }}
      contentClassName={styles.content}
      closeOnOutside={false}
      className={styles.root}
      open={open}
      onClose={onClose}
      title="ارسال فیلم"
      mobileStyle={2}
      headerClassName={styles.header}
    >
      {notSupported ? (
        <div>مرورگر شما ضبط ویدیو را پشتیبانی نمیکند.</div>
      ) : (
        <>
          <div className={styles.webcamContainer}>
            <CircularProgress
              className={styles.backdropProgress}
              variant="determinate"
              value={100}
              size={284}
              thickness={0.6}
              // thickness={1.4}
            />
            <CircularProgress
              className={clsx({
                [styles.progress]: true,
                [styles.fill]: capturing || url,
                [styles.hide]: url,
              })}
              variant="determinate"
              value={capturing || url ? 0 : 100}
              size={284}
              thickness={0.6}
            />
            <div className={styles.placeholder}>
              {open && (
                <Webcam
                  className={styles.webcam}
                  audio={true}
                  muted
                  ref={webcamRef}
                  width={262}
                  height={262}
                  screenshotFormat="image/webp"
                  mirrored
                  videoConstraints={{
                    height: mimeType === "video/mp4" ? 240 : 720,
                    width: mimeType === "video/mp4" ? 240 : 720,
                    aspectRatio: 1,
                    facingMode: "user",
                  }}
                  onUserMediaError={openMediaAccessError}
                />
              )}
              {Boolean(url) && (
                <div className={styles.takenImage}>
                  {Boolean(previewUrl) && <img src={previewUrl} alt="" />}
                  <video
                    onPause={setPaused}
                    width="262"
                    height="262"
                    ref={videoRef}
                    playsInline
                    // muted
                  >
                    <source src={url} type={mimeType!} />
                  </video>
                  <ButtonBase
                    onClick={onPlay}
                    className={clsx({
                      [styles.playOverlay]: true,
                      [styles.hide]: isPlaying,
                    })}
                  >
                    <PlayIcon />
                  </ButtonBase>
                </div>
              )}
            </div>
          </div>

          <Typography fontWeight={700} align="center" sx={{ mb: 1 }}>
            متن زیر را با صدای واضح و رسا بیان کنید.
          </Typography>
          <Typography align="center">
            من {user?.fullName} با تایید و پذیرش کلیه شرایط و ضوابط اقدام به
            افتتاح حساب در کریپو می نمایم.
          </Typography>
          {/* <Typography>۱. گوشی خود را در حالت عمود نگه دارید.</Typography>
          <Typography>
            ۲. به مدت ۵ ثانیه پس از فشردن دکمه به دوربین سلفی گوشی خود نگاه
            کنید.
          </Typography> */}
          {/* <div className={clsx(styles.footer, "mobile-down")}>
            {url ? (
              <>
                <IconButton className={styles.btn} onClick={submit}>
                  <CheckIcon />
                </IconButton>
                <IconButton className={styles.btn} onClick={retake}>
                  <RetryIcon />
                </IconButton>
              </>
            ) : (
              renderRecordBtn()
            )}
          </div> */}
          <div className={clsx(styles.footer)}>
            {url ? (
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
              renderRecordBtn()
            )}
          </div>
        </>
      )}
    </AppDialogComponent>
  );
}
