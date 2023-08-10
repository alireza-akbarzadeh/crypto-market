import styles from "./download-app.module.scss";
import { ButtonBase, Typography } from "@mui/material";
import Image from "next/image";
import PHONE from "@/public/images/download-app-phone.png";
import PWA from "@/public/icons/pwa.svg";
import BAZAAR from "@/public/icons/bazaar.svg";
import SIBCHE from "@/public/icons/sibche.svg";
import ANARDONI from "@/public/icons/anardoni.svg";
import PLAY_STORE from "@/public/icons/play-store.svg";
import SIBAPP from "@/public/icons/sibapp.svg";
// import clsx from "clsx";

type PropTypes = {
  // isKyc?: boolean;
  isIos: boolean;
  openPwaModal: () => void;
};
export default function DownloadAppView(props: PropTypes) {
  const {
    // isKyc,
    isIos,
    openPwaModal,
  } = props;
  return (
    <div className={styles.bluePaper}>
      <div className={styles.phone}>
        <div>
          <Image src={PHONE} layout="responsive" />
        </div>
      </div>
      <div className={styles.content}>
        <Typography
          className={styles.title}
          component="h2"
          variant="h5"
          fontWeight={600}
        >
          الان اپلیکیشن کریپو را نصب کنید
        </Typography>
        <Typography className={styles.subtitle} component="h3" variant="h6">
          تا در لحظه خرید و فروش کنید
        </Typography>
        <ul className={styles.list}>
          <li>
            <Typography>دسترسی سریع به کریپو</Typography>
          </li>
          <li>
            <Typography>مشاهده وضعیت سفارشات</Typography>
          </li>
          <li>
            <Typography>امکان احراز هویت</Typography>
          </li>
        </ul>
        <div className={styles.downloadBtnContainer}>
          <a
            target="_blank"
            href="https://play.google.com/store/apps/details?id=com.crypto.app"
          >
            <DownloadButton
              title="دریافت از"
              secondary="Google Play"
              icon={PLAY_STORE}
            />
          </a>

          <a target="_blank" href="https://cafebazaar.ir/app/com.crypto.app">
            <DownloadButton
              title="دریافت از"
              secondary="کافه بازار"
              icon={BAZAAR}
            />
          </a>
          <a
            target="_blank"
            href="https://sibapp.com/applications/CryptoExchange?from=search"
          >
            <DownloadButton
              title="دریافت از"
              secondary="سیب اپ"
              icon={SIBAPP}
            />
          </a>
          <a target="_blank" href="https://sibche.com/applications/crypto">
            <DownloadButton title="دریافت از" secondary="سیبچه" icon={SIBCHE} />
          </a>
          <a target="_blank" href="https://anardoni.com/ios/app/7JEWt6kBE">
            <DownloadButton
              title="دریافت از"
              secondary="اناردونی"
              icon={ANARDONI}
            />
          </a>
          <DownloadButton
            title="دریافت"
            secondary="نسخه پیشرو"
            icon={PWA}
            onClick={openPwaModal}
          />
        </div>
      </div>
    </div>
  );
}
function DownloadButton(props: any) {
  const { title, secondary, icon, onClick } = props;
  return (
    <ButtonBase onClick={onClick} className={styles.downloadBtn}>
      <div className={styles.info}>
        <Typography className={styles.title}>{title}</Typography>
        <Typography className={styles.secondary}>{secondary}</Typography>
      </div>
      <div className={styles.icon}>
        <Image src={icon} width={36} height={36} />
      </div>
    </ButtonBase>
  );
}
