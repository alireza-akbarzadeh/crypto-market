import {
  BoltIcon,
  CoinIcon,
  PercentIcon,
  SupportHeadsetIcon,
} from "@/core/components/common/custom-icon";
import { Container, Typography } from "@mui/material";
import styles from "./why-us.module.scss";

type PropTypes = {};
export default function WhyUsView(props: PropTypes) {
  return (
    <div className={styles.root}>
      <Container>
        <Typography className="section-title" component="h2">
          چرا کریپو ؟
        </Typography>
        <Typography className={styles.description}>
          ما تنها صرافی با بیش از ۳۰۰ ارز و قیمت مناسب در ایران هستیم که در کنار
          ظاهری سریع و آسان، پشتیبانی ۲۴ ساعته ارائه میده تا خیالتون از هر بابت
          راحت باشه
        </Typography>
        <ul className={styles.list}>
          <li>
            <BoltIcon color="error" />
            <Typography component="h3">خرید و فروش آسان</Typography>
            <Typography component="h4">کاملا سریع و ساده</Typography>
          </li>
          <li>
            <CoinIcon color="warning" />
            <Typography component="h3">بیش از ۳۰۰ نوع ارز</Typography>
            <Typography component="h4">تنها صرافی در ایران !</Typography>
          </li>
          <li>
            <PercentIcon color="success" />
            <Typography component="h3">قیمت مناسب</Typography>
            <Typography component="h4">کمترین مقدار کارمزد</Typography>
          </li>
          <li>
            <SupportHeadsetIcon color="primary" />
            <Typography component="h3">پشتیبانی ۲۴ ساعته</Typography>
            <Typography component="h4">حتی جمعه‌ها !</Typography>
          </li>
        </ul>
      </Container>
    </div>
  );
}
