import styles from "./kyc-national-card.module.scss";
import AppHeaderComponent from "@/core/components/layouts/app-header";
import { Container, Typography, Paper } from "@mui/material";
import Image from "next/image";
import SCAN_CARD_IMAGE from "@/public/images/scan-national-card.png";
import SCAN_ID_IMAGE from "@/public/images/scan-birth-certificate.png";
import TimerButton from "@/core/components/common/timer-button";
import clsx from "clsx";

type PropTypes = {
  openPictureModal: () => void;
  hasCard: boolean;
};

export default function KycNationalCardView(props: PropTypes) {
  const { openPictureModal, hasCard } = props;
  return (
    <div className={styles.root}>
      <AppHeaderComponent />
      <Container maxWidth="sm">
        <Paper className={styles.paper}>
          <Typography className={clsx(!hasCard && "hidden")}>
            گوشی تلفن خود را در حالت عمود نگه دارید و از کارت ملی خود عکس
            بگیرید.
          </Typography>
          <Typography className={clsx(hasCard && "hidden")}>
            گوشی تلفن خود را در حالت عمود نگه دارید و از شناسنامه در کنار برگه
            درخواست کارت ملی هوشمند خود عکس بگیرید.
          </Typography>
          <div className={clsx(!hasCard && "hidden", styles.imageWrapper)}>
            <Image className="hidden" src={SCAN_CARD_IMAGE} />
          </div>
          <div className={clsx(hasCard && "hidden", styles.imageWrapper)}>
            <Image className="hidden" src={SCAN_ID_IMAGE} />
          </div>
          <ul>
            <Typography className={clsx(hasCard && "hidden")} component="li">
              1. فقط از روی اصل کارت شناسایی خود عکس بگیرید
            </Typography>
            <Typography className={clsx(!hasCard && "hidden")} component="li">
              1. فقط از روی اصل شناسنامه خود عکس بگیرید
            </Typography>
            <Typography component="li">
              2. به هیچ عنوان از روی تصویر، عکس نگیرید
            </Typography>
          </ul>
          <TimerButton
            onClick={openPictureModal}
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
