import { Container, Grid, Typography } from "@mui/material";
import styles from "./app-footer.module.scss";
import Link from "next/link";
import {
  BoltIcon,
  CoinIcon,
  PercentIcon,
  SupportHeadsetIcon,
} from "../../common/custom-icon";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LOGO from "@/public/images/header-logo.svg";
import Image from "next/image";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import clsx from "clsx";

type PropTypes = {
  openCrisp: () => void;
  bitgapHref: string;
};
export default function AppFooterView(props: PropTypes) {
  const { bitgapHref, openCrisp } = props;

  return (
    <div className={styles.root}>
      <div className={styles.main}>
        <Container>
          <Grid container spacing={2} rowSpacing={4}>
            <Grid className={styles.links} item container xs={12} md={5} lg={6}>
              <Grid item xs={4}>
                <Typography className={styles.title}>کریپو</Typography>
                <ul>
                  <li>
                    <Link href="/fee" passHref>
                      <Typography component="a">کارمزدها</Typography>
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms-of-service" passHref>
                      <Typography component="a">قوانین و مقررات</Typography>
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact-manager" passHref>
                      <Typography component="a">ارتباط با مدیریت</Typography>
                    </Link>
                  </li>
                  <li>
                    <Link href="/careers" passHref>
                      <Typography component="a">فرصت‌های شغلی</Typography>
                    </Link>
                  </li>
                  <li>
                    <Link href="/about-us" passHref>
                      <Typography component="a">درباره ما</Typography>
                    </Link>
                  </li>
                </ul>
              </Grid>
              <Grid item xs={4}>
                <Typography className={styles.title}>سرویس‌ها</Typography>
                <ul>
                  <li>
                    <Link href="/live-price" passHref>
                      <Typography component="a">قیمت لحظه‌ای</Typography>
                    </Link>
                  </li>
                  <li>
                    <Link href="/portfolio" passHref>
                      <Typography component="a">پورتفوی</Typography>
                    </Link>
                  </li>
                  <li>
                    <Typography component="a" href={bitgapHref}>
                      بیت گپ
                    </Typography>
                  </li>
                  <li>
                    <Typography component="a" href="/news">
                      خبر فوری
                    </Typography>
                  </li>
                  <li>
                    <Typography href="/" component="a">
                      مشاوره آنلاین
                    </Typography>
                  </li>
                  <li>
                    <Typography href="/" component="a">
                      آموزش
                    </Typography>
                  </li>
                </ul>
              </Grid>
              <Grid item xs={4}>
                <Typography className={styles.title}>
                  راهنمایی و پشتیبانی
                </Typography>
                <ul>
                  <li>
                    <Link href="/faq" passHref>
                      <Typography component="a">سوالات متداول</Typography>
                    </Link>
                  </li>
                  <li>
                    <Typography component="a" onClick={openCrisp}>
                      تماس با پشتیبانی
                    </Typography>
                  </li>
                  <li>
                    <Link href="/how-to-create-wallet" passHref>
                      <Typography component="a">آموزش ساخت کیف پول</Typography>
                    </Link>
                  </li>
                </ul>
              </Grid>
            </Grid>
            <Grid item container xs={12} md={7} lg={6}>
              <Grid item xs={6}>
                <div className={styles.contactChip}>
                  <Typography className={styles.label} component="span">
                    شماره تماس
                  </Typography>
                  <div className={styles.value}>
                    <SupportHeadsetIcon />
                    <Typography component="span">(021) 91079677</Typography>
                  </div>
                </div>
                <div className={styles.contactChip}>
                  <Typography className={styles.label} component="span">
                    ایمیل
                  </Typography>
                  <div className={styles.value}>
                    <MailOutlineIcon />
                    <Typography component="span">support@crypto.com</Typography>
                  </div>
                </div>
              </Grid>
              <Grid className={styles.motto} item xs={6}>
                <div className={styles.logo}>
                  <Image src={LOGO} width={146} height={60} />
                </div>
                <Typography>
                  یـه تــجربه خــــوب از
                  <br />
                  دنــــیای ارز دیــجیـتال
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container className={styles.powers}>
                <Grid className={styles.power} item xs={3}>
                  <BoltIcon className={styles.icon} />
                  <div>
                    <Typography className={styles.title} component="div">
                      خرید و فروش آسان
                    </Typography>
                    <Typography className={styles.subtitle} component="div">
                      کاملا سریع و ساده
                    </Typography>
                  </div>
                </Grid>
                <Grid className={styles.power} item xs={3}>
                  <CoinIcon className={styles.icon} />
                  <div>
                    <Typography className={styles.title} component="div">
                      بیش از ۳۰۰ نوع ارز
                    </Typography>
                    <Typography className={styles.subtitle} component="div">
                      تنها صرافی در ایران !
                    </Typography>
                  </div>
                </Grid>
                <Grid className={styles.power} item xs={3}>
                  <PercentIcon className={styles.icon} />
                  <div>
                    <Typography className={styles.title} component="div">
                      قیمت مناسب
                    </Typography>
                    <Typography className={styles.subtitle} component="div">
                      کمترین مقدار کارمزد
                    </Typography>
                  </div>
                </Grid>
                <Grid className={styles.power} item xs={3}>
                  <SupportHeadsetIcon className={styles.icon} />
                  <div>
                    <Typography className={styles.title} component="div">
                      پشتیبانی ۲۴ ساعته
                    </Typography>
                    <Typography className={styles.subtitle} component="div">
                      حتی جمعه‌ها !
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
             </div>
      <div className={styles.foot}>
        <Container>
          <div className={styles.content}>
            <div className={styles.social}>
              <Typography variant="body2">
                در شبکه‌های اجتماعی ما را دنبال کنید
              </Typography>

              <ul>
                <li>
                  <a href="https://www.linkedin.com/company/crypto/">
                    <LinkedInIcon />
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/crypto/">
                    <TwitterIcon />
                  </a>
                </li>
                <li>
                  <a href="https://t.me/crypto24">
                    <TelegramIcon />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/crypto24/">
                    <InstagramIcon />
                  </a>
                </li>
              </ul>
            </div>
            <div className={styles.copyright}>
              <div className={styles.logo}>
                <Image src={LOGO} width={72} height={30} />
              </div>
              <Typography className={clsx("en", styles.text)}>
                ALL rights reserved - © Copy Right 2022
              </Typography>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
