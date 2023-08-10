import styles from "./login-box.module.scss";
import { Box, Container, Typography, Grid, Button } from "@mui/material";

type PropTypes = {
  openLoginModal: () => void;
};
export default function LoginBoxView(props: PropTypes) {
  const { openLoginModal } = props;
  return (
    <div className={styles.root}>
      <Container>
        <Typography component="h4" className={styles.title}>
          ورود یا ثبت نام
        </Typography>
        <Typography className={styles.description}>
          برای استفاده از سرویس‌های کریپو ابتدا <span>وارد شوید</span> و یا
          <span>ثبت نام</span> کنید
        </Typography>
        <Button
          onClick={openLoginModal}
          variant="contained"
          className={styles.btn}
        >
          ورود یا ثبت نام
        </Button>
      </Container>
    </div>
  );
}
