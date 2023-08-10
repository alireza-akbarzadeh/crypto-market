import styles from "./kyc-video.module.scss";
import AppHeaderComponent from "@/core/components/layouts/app-header";
import { Container, Typography, Paper } from "@mui/material";
import Image from "next/image";
import PHONE_VIDEO from "@/public/images/kyc-video.png";
import TimerButton from "@/core/components/common/timer-button";

type PropTypes = {
  openVideoModal: () => void;
};
export default function KycVideoView(props: PropTypes) {
  const { openVideoModal } = props;
  return (
    <div className={styles.root}>
      <AppHeaderComponent />
      <Container maxWidth="sm">
        <Paper className={styles.paper}>
          <Typography>
            در این مرحله باید درخواست احراز هویت را ثبت کنید. برای این کار پس از
            فشردن دکمه به دوربین سلفی گوشی خود نگاه کنید و متنی که نمایش داده
            می‌شود را با صدای رسا بیان کنید.
          </Typography>
          <div className={styles.imageWrapper}>
            <Image src={PHONE_VIDEO} />
          </div>
          <Typography className={styles.listTitle}>توجه کنید که:</Typography>
          <ul>
            <Typography component="li">۱. عینک نداشته باشید. </Typography>
            <Typography component="li">
              ۲. لباس متعارف به تن داشته باشید.
            </Typography>
            <Typography component="li">
              ۳. فقط چهره خودتان در تصویر باشد.
            </Typography>
            <Typography component="li">
              ۴. نیازی به گرفتن کارت شناسایی در دست نمیباشد.
            </Typography>
            <Typography component="li">
              ۵. در اتاق یا فضای سر بسته تصویر بگیرید.
            </Typography>
          </ul>
          <TimerButton
            onClick={openVideoModal}
            className={styles.button}
            time={9}
            variant="contained"
            fullWidth
          >
            ادامه
          </TimerButton>
        </Paper>
      </Container>
    </div>
  );
}
