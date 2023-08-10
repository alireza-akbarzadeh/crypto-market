import styles from "./how-to-create-wallet.module.scss";

import {
  Box,
  Grid,
  Container,
  Paper,
  Typography,
  Link as MuiLink,
  ButtonBase,
} from "@mui/material";
import Image from "next/image";
import CREATE_WALLET_HEADER from "@/public/images/create-wallet-header.svg";
import PHONE_2_1 from "@/public/images/trust-wallet/02-1.png";
import PHONE_2_2 from "@/public/images/trust-wallet/02-2.png";
import PHONE_3_1 from "@/public/images/trust-wallet/03-1.png";
import PHONE_3_2 from "@/public/images/trust-wallet/03-2.png";
import PHONE_4_1 from "@/public/images/trust-wallet/04-1.png";
import PHONE_4_2 from "@/public/images/trust-wallet/04-2.png";
import PHONE_5 from "@/public/images/trust-wallet/05.png";
import PHONE_6 from "@/public/images/trust-wallet/06.png";
import PHONE_7 from "@/public/images/trust-wallet/07.png";
import PHONE_8 from "@/public/images/trust-wallet/08.png";
import BAZAAR from "@/public/icons/bazaar.svg";
import APPLE from "@/public/icons/apple.svg";
import ANDROID from "@/public/icons/android.svg";
import PLAY_STORE from "@/public/icons/play-store.svg";
import AppHeaderComponent from "@/core/components/layouts/app-header";

type PropTypes = { isCafeBazaar?: boolean };
export default function HowToCreateWalletView(props: PropTypes) {
  const { isCafeBazaar } = props;
  return (
    <Box className={styles.root}>
      <AppHeaderComponent
        className={styles.pageHeader}
        title="آموزش ساخت کیف پول"
        backHref="/"
      />
      <Container>
        <div className={styles.paper}>
          <div className={styles.header}>
            <div className={styles.headImageWrapper}>
              <Image src={CREATE_WALLET_HEADER} />
            </div>
            <div className={styles.mainDesk}>
              <Typography className={styles.title} variant="h4" component="h2">
                آموزش ساخت کیف پول
              </Typography>
              <Typography>
                کریپو سرویس کیف پول ارزی ارائه نمی دهد، اما اگر قصد ساخت یک کیف
                پول امن و مطمئن را دارید که ارز های متنوعی را پشتیبانی کند،
                توصیه ما به شما تراست ولت است. همچنین توجه داشته باشید که بهتر
                است هنگام استفاده از این کیف پول فیلترشکن خودتون رو روشن کنید و
                از آی‌پی کشوری که در لیست تحریم ها نیست استفاده کنید.
              </Typography>
            </div>
          </div>

          <div className={styles.step}>
            <Typography component="h3" className={styles.title}>
              گام اول
            </Typography>
            {isCafeBazaar !== undefined && (
              <>
                <Typography className={styles.desc}>
                  اپلیکیشن TrustWallet را
                  {isCafeBazaar ? "" : " از پلی استور یا اپ استور"} دانلود کنید.
                </Typography>
                <div className={styles.downloadButtons}>
                  {isCafeBazaar ? (
                    <DownloadButton
                      title="دریافت از"
                      secondary="کافه بازار"
                      icon={BAZAAR}
                      href="https://cafebazaar.ir/app/com.wallet.crypto.trustapp"
                    />
                  ) : (
                    <>
                      <DownloadButton
                        title="دریافت از"
                        secondary="App Store"
                        icon={APPLE}
                        href="https://itunes.apple.com/us/app/trust-ethereum-wallet/id1288339409"
                      />
                      <DownloadButton
                        title="دریافت از"
                        secondary="Google Play"
                        icon={PLAY_STORE}
                        href="https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp"
                      />
                      <DownloadButton
                        title="دانلود با لینک مستقیم"
                        secondary="برای اندروید"
                        icon={ANDROID}
                        href="https://trustwallet.com/dl/apk"
                      />
                    </>
                  )}
                </div>
              </>
            )}
          </div>
          <div className={styles.step}>
            <Typography component="h3" className={styles.title}>
              گام دوم
            </Typography>
            <Typography className={styles.desc}>
              روی دکمه آبی رنگ کلیک کنید تا ساخت کیف پول را آغاز کنیم.
            </Typography>
            <div className={styles.images}>
              <Image src={PHONE_2_1} />
              <Image src={PHONE_2_2} />
            </div>
          </div>
          <div className={styles.step}>
            <Typography component="h3" className={styles.title}>
              گام سوم
            </Typography>
            <Typography className={styles.desc}>
              ۱۲ عبارت بازیابی خود را با دقت یادداشت کنید.
              <br />
              در صورتی که این عبارت را از دست بدهید ارزهای خود را از دست خواهید
              داد و بدون این عبارات هیچ راهی برای بازگرداندن نیست.
            </Typography>
            <div className={styles.images}>
              <Image src={PHONE_3_1} />
              <Image src={PHONE_3_2} />
            </div>
          </div>
          <div className={styles.step}>
            <Typography component="h3" className={styles.title}>
              گام چهارم
            </Typography>
            <Typography className={styles.desc}>
              کلماتی را که یادداشت کرده اید به ترتیب انتخاب کنید.
            </Typography>
            <div className={styles.images}>
              <Image src={PHONE_4_1} />
              <Image src={PHONE_4_2} />
            </div>
          </div>
          <div className={styles.step}>
            <Typography component="h3" className={styles.title}>
              گام پنجم
            </Typography>
            <Typography className={styles.desc}>
              اکنون ساخت کیف پول شما نهایی شده.
            </Typography>
            <div className={styles.images}>
              <Image src={PHONE_5} />
            </div>
          </div>
          <div className={styles.step}>
            <Typography component="h3" className={styles.title}>
              گام ششم
            </Typography>
            <Typography className={styles.desc}>
              برای یافتن آدرس کیف پول خود، روی نماد ارز مورد نظر خود کلیک بزنید.
            </Typography>
            <div className={styles.images}>
              <Image src={PHONE_6} />
            </div>
          </div>
          <div className={styles.step}>
            <Typography component="h3" className={styles.title}>
              گام هفتم
            </Typography>
            <Typography className={styles.desc}>
              Receive را کلیک کنید.
            </Typography>
            <div className={styles.images}>
              <Image src={PHONE_7} />
            </div>
          </div>
          <div className={styles.step}>
            <Typography component="h3" className={styles.title}>
              گام هشتم
            </Typography>
            <Typography className={styles.desc}>
              برای ذخیره در کلیپ بورد روی copy کلیک کنید و در زمان خرید در بخش
              کیف پول در کریپو ثبت کنید.
            </Typography>
            <div className={styles.images}>
              <Image src={PHONE_8} />
            </div>
          </div>
        </div>
      </Container>
    </Box>
  );
}

function DownloadButton(props: any) {
  const { title, secondary, icon, href } = props;
  return (
    <ButtonBase
      component="a"
      target="_blank"
      rel="noreferrer noopener"
      className={styles.downloadBtn}
      href={href}
    >
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
