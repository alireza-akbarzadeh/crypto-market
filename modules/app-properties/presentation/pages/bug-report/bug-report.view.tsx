import styles from "./bug-report.module.scss";
import { UserInterface } from "@/modules/auth/domain/entities/user";
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import Image from "next/image";
import BUG_REPORT from "@/public/images/bug-report.png";
// import BUG_REPORT from "@/public/images/bug-report.svg";
import { TasksIcon } from "@/core/components/common/custom-icon";
import AppHeaderComponent from "@/core/components/layouts/app-header";

type PropTypes = {
  user?: UserInterface;
  openLoginModal: () => void;
  openReport: () => void;
  userLoading: boolean;
};

export default function BugReportView(props: PropTypes) {
  const { openLoginModal, openReport, user, userLoading } = props;
  return (
    <Box className={styles.root}>
      <AppHeaderComponent
        className={styles.pageHeader}
        title="گزارش باگ"
        backHref="/profile"
      />
      <Container>
        <div className={styles.paper}>
          <div className={styles.header}>
            <div className={styles.headImageWrapper}>
              <Image src={BUG_REPORT} />
            </div>
            <div className={styles.mainDesk}>
              <Typography className={styles.title} variant="h4" component="h2">
                گزارش باگ
              </Typography>
              <Typography>
                در صورت مشاهده باگ یا نقص عملکرد،‌ می‌توانید با گزارش در این فرم
                ما را در حفظ امنیت خرید و اطلاعات کاربران یاری کنید. پس از بررسی
                گزارش توسط تیم مربوطه طبق جدول قیمت گذاری زیرهدیه‌ای جهت قدردانی
                تقدیم شما خواهد شد.
              </Typography>
            </div>
          </div>
          <div className={styles.section}>
            <Typography
              component="h3"
              variant="h6"
              fontWeight={500}
              color="info.main"
            >
              قوانین:
            </Typography>
            <ul className={styles.blueList}>
              <Typography component="li">
                هک های اجتماعی، فیشینگ،‌ DDoS و حملاتی از این قبیل جزو برنامه
                باگ بانتی نیست. از انجام آن ها جدا خودداری کنید.
              </Typography>
              <Typography component="li">
                در صورتی که فعالیت شما باعث اخلال در خدمات کارفرما شود،‌ فعالیت
                خود را متوقف کرده و کارفرما را در جریان قرار دهید.
              </Typography>
              <Typography component="li">
                اطلاعات استخراج شده از سایت یا سرویس کارفرما باید در کمترین
                میزان ممکن باشد، به عنوان مثال هنگام تزریق دیتابیس ردیف های
                محدودی را دریافت کنید.
              </Typography>
              <Typography component="li">
                در صورت کشف باگ، سریعا آن را برای بررسی ارسال کنید و از استخراج
                اطلاعات اضافه پرهیز کنید.
              </Typography>
              <Typography component="li">
                گزارش باگ باید شامل مراحل بازتولید باگ به صورت کاملا شفاف باشد.
              </Typography>
              <Typography component="li">
                اداش به اولین نفری که آسیب‌پذیری را گزارش کند تعلق می‌گیرد.
              </Typography>
              <Typography component="li">
                ارزش گذاری و تعیین سطح خطر آسیب‌پذیری برعهده ی تیم داوری
                می‌باشد.
              </Typography>
            </ul>
          </div>
          <div className={styles.section}>
            <Typography
              component="h3"
              variant="h6"
              fontWeight={500}
              color="info.main"
            >
              محدوده کشف آسیب پذیری:
            </Typography>
            <ul className={styles.blueList}>
              <Typography component="li">
                تمامی آدرس ها و زیر دامنه‌های crypto.com
              </Typography>
            </ul>
          </div>
          <div className={styles.section}>
            <Typography
              component="h3"
              variant="h6"
              fontWeight={500}
              color="info.main"
            >
              جوایز کشف آسیب‌پذیری:
            </Typography>
            <ul>
              <Typography component="li">
                <span>🥇</span> ارزش باگ های بحرانی 8,000,000 تومان
              </Typography>
              <Typography component="li">
                <span>🥈</span> ارزش باگ های خطرناک 5,000,000 تومان
              </Typography>
              <Typography component="li">
                <span>🥉</span>
                ارزش باگ های متوسط 3,000,000 تومان
              </Typography>
            </ul>
          </div>
          <div className={styles.section}>
            <div className={styles.infoAlert}>
              <TasksIcon className={styles.icon} />
              <Typography className={styles.title}>معیار سنجش</Typography>
              <Typography textAlign="justify">
                ارزش باگ های شناسایی شده بر اساس استاندارد امنیتی CVSS V3.0 توسط
                تیم فنی کریپو مشخص می‌گردد و باگ ها در سه قالب بحرانی، خطرناک و
                متوسط طبقه بندی خواهند شد.
              </Typography>
            </div>
          </div>
          {userLoading ? null : user ? (
            <div className={styles.buttonContainer}>
              <Button
                onClick={openReport}
                className={styles.button}
                variant="contained"
              >
                ثبت گزارش
              </Button>
            </div>
          ) : (
            <>
              <Typography>
                جهت ثبت گزارش خود، ابتدا وارد حساب کاربری کریپو شوید و سپس اینجا
                را کلیک کنید.
              </Typography>
              <div className={styles.buttonContainer}>
                <Button
                  onClick={openLoginModal}
                  className={styles.button}
                  variant="contained"
                >
                  ورود
                </Button>
              </div>
            </>
          )}
        </div>
      </Container>
    </Box>
  );
}
