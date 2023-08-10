import AppHeaderComponent from "@/core/components/layouts/app-header";

import { Container, Typography } from "@mui/material";
import styles from "./roadmap.module.scss";

type PropTypes = {};
export default function RoadmapView(props: PropTypes) {
  return (
    <div className={styles.root}>
      <AppHeaderComponent title="مسیر کریپو" backHref="/profile" />
      <Container maxWidth="sm">
        <Typography className={styles.title} component="h1">
          مسیر کریپو
        </Typography>
        <div className={styles.timelineContainer}>
          <div className={styles.timelineItem}>
            <Typography component="div" className={styles.label}>
              الان اینجا هستیم
            </Typography>
            <div className={styles.description}>
              <Typography>اتفاق‌‌های جدیدی تو راهه...</Typography>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <Typography component="div" className={styles.label}>
              خرداد ۱۴۰۱
            </Typography>
            <div className={styles.description}>
              <Typography className={styles.version}>نسخه ۴.۰</Typography>
              <Typography>
                راه‌اندازی سوپر اپلیکیشن کریپو، افزایش تعداد ارزها به ۳۰۳ عدد،
                بهبود رابط کاربری و اضافه شدن سرویس های تحلیل، آموزش، گوش به زنگ
                و خبر فوری در سوپر اپلیکیشن کریپو
              </Typography>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <Typography component="div" className={styles.label}>
              اسفند ۱۴۰۰
            </Typography>
            <div className={styles.description}>
              <Typography className={styles.version}>نسخه ۳.۰</Typography>
              <Typography>
                اضافه شدن کیف پول ریالی، بهبود رابط کاربری با ظاهری جدید، افزودن
                پورتفوی (سبد دارایی)، بهبود امنیت، فیلتر و ترتیب در قیمت
                لحظه‌‌ای، احراز هویت راحت تر
              </Typography>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <Typography component="div" className={styles.label}>
              خرداد ۱۴۰۰
            </Typography>
            <div className={styles.description}>
              <Typography className={styles.version}>نسخه ۲.۵</Typography>
              <Typography>
                افزایش تعداد ارزها به 215 عدد، عدم نیاز به ثبت شناسه تراکنش،
                تسهیل فرایند احراز هویت، طراحی مجدد صفحه سفارشات، راه اندازی
                سامانه تیکتینگ، رفع باگ های گزارش شده
              </Typography>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <Typography component="div" className={styles.label}>
              خرداد ۱۳۹۹
            </Typography>
            <div className={styles.description}>
              <Typography className={styles.version}>نسخه ۲.۴</Typography>
              <Typography>
                تغییر رابط کاربری، افزودن ۲۵ ارز جدید، امکان جستجوی ارزها، عنوان
                گذاری کیف پول ها، افزودن بیت گپ، افزودن سرویس اطلاع رسانی
              </Typography>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <Typography component="div" className={styles.label}>
              اسفند 1398
            </Typography>
            <div className={styles.description}>
              <Typography className={styles.version}>نسخه ۲.۳</Typography>
              <Typography>
                افزودن ۱۰ ارز دیجیتال، راه اندازی سیستم امور مشتریان، راه اندازی
                سیستم اطلاع رسانی
              </Typography>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <Typography component="div" className={styles.label}>
              دی 1398
            </Typography>
            <div className={styles.description}>
              <Typography className={styles.version}>نسخه ۲.۲</Typography>
              <Typography>
                ارائه نمودار در قیمت لحظه ای، ۲۴ ساعته شدن پشتیبانی کاربران، رفع
                باگ های گزارش شده
              </Typography>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <Typography component="div" className={styles.label}>
              آذر 1398
            </Typography>
            <div className={styles.description}>
              <Typography className={styles.version}>نسخه ۲.۱</Typography>
              <Typography>
                بهبود فرایند فروش ارز، تسویه حساب آنی بانکهای سپه و آینده، رفع
                باگ های گزارش شده
              </Typography>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <Typography component="div" className={styles.label}>
              مهر 1398
            </Typography>
            <div className={styles.description}>
              <Typography className={styles.version}>نسخه ۲.۰</Typography>
              <Typography>
                رفع باگ های گزارش شده، بهینه سازی فرایند خرید و فروش
              </Typography>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <Typography component="div" className={styles.label}>
              شهریور 1398
            </Typography>
            <div className={styles.description}>
              <Typography className={styles.version}>نسخه ۱.۹</Typography>
              <Typography>
                افزودن ارزهای آنکر،‌ داسک، وینک، افزودن ارزهای کوکز،‌ متال،
                پاندی، تسویه حساب آنی سفارشات خرید و فروش
              </Typography>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <Typography component="div" className={styles.label}>
              مرداد 1398
            </Typography>
            <div className={styles.description}>
              <Typography className={styles.version}>نسخه ۱.۸</Typography>
              <Typography>
                افزودن ارزهای دوج کوین و الراند، امکان تغییر آدرس کیف پول کاربر
                ، اضافه شدن بلاگ در کریپو
              </Typography>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <Typography component="div" className={styles.label}>
              تیر 1398
            </Typography>
            <div className={styles.description}>
              <Typography className={styles.version}>نسخه ۱.۷</Typography>
              <Typography>
                طراحی مجدد صفحه قیمت لحظه ای، ارتقاء روش استعلام مالکیت
                سیم‌کارت، افزودن استعلام ثبت احوال، اعمال شرط ۳کارت برای خرید
                های بالا
              </Typography>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <Typography component="div" className={styles.label}>
              خرداد 1398
            </Typography>
            <div className={styles.description}>
              <Typography className={styles.version}>نسخه ۱.6</Typography>
              <Typography>
                استعلام کارت بانکی و شماره شبا، ارتقاء سطح احراز هویت کاربران
                قرارگرفتن کدرهگیری بانکی در سفارشات، برطرف شدن برخی باگ های
                گزارش شده، افزودن ۳ ارز به فهرست ارزهای کریپو
              </Typography>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <Typography component="div" className={styles.label}>
              فروردین 1398
            </Typography>
            <div className={styles.description}>
              <Typography className={styles.version}>نسخه ۱.۵</Typography>
              <Typography>
                ارتقاء امنیت سرورهای کریپو، ارتقاء مکانیزم احراز هویت کاربران ،
                24ساعته شدن خرید و فروش، افزودن بخش پروفایل کاربری
              </Typography>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <Typography component="div" className={styles.label}>
              دی 1397
            </Typography>
            <div className={styles.description}>
              <Typography className={styles.version}>نسخه ۱.۴</Typography>
              <Typography>
                طراحی محیطی جذاب و زیبا برای کاربران، صفحه ورود و ثبت نام ساده ،
                امکان مشاهده ریز جزئیات سفارشات
              </Typography>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <Typography component="div" className={styles.label}>
              آبان 1397
            </Typography>
            <div className={styles.description}>
              <Typography className={styles.version}>نسخه ۱.۳</Typography>
              <Typography>
                ارتقاء سرورهای کریپو، رفع برخی باگ های گزارش شده
              </Typography>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <Typography component="div" className={styles.label}>
              مرداد 1397
            </Typography>
            <div className={styles.description}>
              <Typography className={styles.version}>نسخه ۱.۲</Typography>
              <Typography>
                راه اندازی بخش مبدل قیمت، افزایش تعداد ارزها به ۱۵ ارز
              </Typography>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <Typography component="div" className={styles.label}>
              خرداد 1397
            </Typography>
            <div className={styles.description}>
              <Typography className={styles.version}>نسخه ۱.۱</Typography>
              <Typography>
                راه‌اندازی بخش خرید و فروش فوری، اضافه شدن بخش اخبار، اضافه شدن
                بخش تحلیل تکنیکال
              </Typography>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <Typography component="div" className={styles.label}>
              اردیبهشت 1397
            </Typography>
            <div className={styles.description}>
              <Typography className={styles.version}>تولد کریپو</Typography>
              <Typography>راه اندازی سامانه خرید و فروش❤</Typography>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
