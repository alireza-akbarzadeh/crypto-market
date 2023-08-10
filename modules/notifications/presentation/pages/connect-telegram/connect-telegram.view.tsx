import LoadingComponent from "@/core/components/common/loading";
import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
import styles from "./connect-telegram.module.scss";
import LOGO from "@/public/images/crypto.svg";
import SUCCESS_ICON from "@/public/icons/status-success.svg";
import ERROR_ICON from "@/public/icons/status-error.svg";
import Link from "next/link";
import { UserInterface } from "@/modules/auth/domain/entities/user";
import UnauthenticatedContentComponent from "@/core/components/layouts/unauthenticated-content";

type PropTypes = {
  data?: {
    success: boolean;
    title: string;
  };
  user?: UserInterface;
};
export default function ConnectTelegramView(props: PropTypes) {
  const { data, user } = props;
  if (!user) {
    return (
      <UnauthenticatedContentComponent
        title="فعالسازی ربات تلگرام"
        backHref="/"
      >
        برای فعالسازی ربات تلگرام باید وارد حساب کاربری خود شوید
      </UnauthenticatedContentComponent>
    );
  }
  return (
    <div className={styles.root}>
      <AppBar className={styles.header} elevation={1}>
        <Toolbar>
          <Image src={LOGO} width={100} />
        </Toolbar>
      </AppBar>
      {data ? (
        <Container className={styles.content}>
          <div className={styles.centerContent}>
            <Image src={data.success ? SUCCESS_ICON : ERROR_ICON} />
            <Typography className={styles.title}>{data.title}</Typography>
            {/* <Typography className={styles.message}>
              {data.description}
            </Typography> */}
          </div>
          <Link href="/notifications" replace>
            <Button variant="contained" className={styles.button}>
              بازگشت
            </Button>
          </Link>
        </Container>
      ) : (
        <LoadingComponent fullScreen />
      )}
    </div>
  );
}
