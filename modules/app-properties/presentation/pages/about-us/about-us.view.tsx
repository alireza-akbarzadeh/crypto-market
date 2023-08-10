import styles from "./about-us.module.scss";
import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";
// import ABOUT_US from "@/public/images/about.svg";
import ABOUT_US from "@/public/images/about.png";
import KB_IMAGE from "@/public/images/KB.png";
import H_IMAGE from "@/public/images/h.png";
import AppHeaderComponent from "@/core/components/layouts/app-header";

type PropTypes = {
  openEnamad: () => void;
};
export default function AboutUsView(props: PropTypes) {
  const { openEnamad } = props;
  return (
    <Box className={styles.root}>
      <AppHeaderComponent
        className={styles.pageHeader}
        title="درباره ما"
        backHref="/profile"
      />
      <Container>
        <div className={styles.paper}>
          <div className={styles.header}>
            <div className={styles.headImageWrapper}>
              <Image src={ABOUT_US} />
            </div>
            <div className={styles.mainDesk}>
              <Typography className={styles.title} variant="h4" component="h2">
                درباره ما
              </Typography>
              <Typography>
                کریپو
                {/* (شرکت تجارت الکترونیک فرداد شریف)  */} مجموعه‌ای دانش بنیان
                در زمینه ارزهای دیجیتال است که از سال ۱۳۹۷ با هدف فراهم آوردن
                بستری امن و سریع برای خرید و فروش ارزهای دیجیتال شروع به کار
                کرده است.
              </Typography>
            </div>
          </div>

          {/* <iframe
            className={styles.mapFrame}
            src="https://maps.google.com/maps?q=%D8%AF%D8%A7%D9%86%D8%B4%DA%A9%D8%AF%D9%87%20%D9%85%D8%AF%DB%8C%D8%B1%DB%8C%D8%AA%20%D8%AF%D8%A7%D9%86%D8%B4%DA%AF%D8%A7%D9%87%20%D8%AA%D9%87%D8%B1%D8%A7%D9%86&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
            frameBorder="0"
            scrolling="no"
          ></iframe> */}

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d202.50198961960376!2d51.39814293713244!3d35.700834227823904!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1658568951493!5m2!1sen!2s"
            className={styles.mapFrame}
            frameBorder="0"
            scrolling="no"
          ></iframe>

          <Typography
            component="h3"
            variant="h6"
            fontWeight={500}
            color="info.main"
          >
            ساعات پاسخگویی:
          </Typography>
          <Typography>
            ۷ روز هفته، ۲۴ ساعت شبانه‌روز پاسخگوی شما هستیم
          </Typography>

          <Typography
            component="h3"
            variant="h6"
            fontWeight={500}
            color="info.main"
          >
            زمان خرید و فروش:
          </Typography>
          <Typography>
            ۷ روز هفته، ۲۴ ساعت شبانه‌روز در خدمت شما هستیم
          </Typography>
          <Typography
            component="h3"
            variant="h6"
            fontWeight={500}
            color="info.main"
          >
            زمان احراز هویت:
          </Typography>
          <Typography>
            همه روزه حتی در ایام تعطیل از ساعت ۸:۰۰ صبح تا ۱۶:۰۰ عصر
          </Typography>
          <Typography
            component="h3"
            variant="h6"
            fontWeight={500}
            color="info.main"
          >
            علامت تجاری:
          </Typography>
          <Typography>
            به موجب اظهارنامه ثبت علامت تجاری به شماره ۱۳۹۸۵۰۱۴۰۰۰۱۰۴۰۷۸۳ علامت
            تجاری "کریپو" در مرکز مالکیت معنوی ج.ا ثبت گردیده است.
          </Typography>
          <Typography
            component="h3"
            variant="h6"
            fontWeight={500}
            color="info.main"
          >
            آدرس:
          </Typography>
          <Typography>
            تهران، خیابان انقلاب، ابتدای خیابان دانشگاه، جنب انتشارات فرزین پلاک
            ۱۷۲ طبقه اول. (مراجعات حضوری با هماهنگی قبلی)
          </Typography>
          <div className={styles.namadContainer}>
            {/* <Image src={NAMAD} /> */}
            {/* <img
              id="jxlzjzpewlaowlaojzpejxlz"
              referrerPolicy="origin"
              onClick={openEnamad}
              alt="logo-samandehi"
              src="https://logo.samandehi.ir/logo.aspx?id=174471&amp;p=nbpdyndtshwlshwlyndtnbpd"
            /> */}
            <img
              className={styles.enamad}
              referrerPolicy="origin"
              id="rgvjjxlzwlaojxlzesgtnbqe"
              alt="logo-samandehi"
              src="https://logo.samandehi.ir/logo.aspx?id=314102&amp;p=qftinbpdshwlnbpdlymaodrf"
            />
            <div>
              <Image src={KB_IMAGE} width={118} height={45} />
            </div>
            <div>
              <Image src={H_IMAGE} width={51} height={45} />
            </div>
          </div>
        </div>
      </Container>
    </Box>
  );
}
