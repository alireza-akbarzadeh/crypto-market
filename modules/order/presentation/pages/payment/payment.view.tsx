import { PaymentOrderResult } from "@/modules/order/domain/entities/payment";
import LOGO from "@/public/images/crypto.svg";
import Image from "next/image";
import Link from "next/link";
import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
import styles from "./payment.module.scss";
import SUCCESS_ICON from "@/public/icons/status-success.svg";
import ERROR_ICON from "@/public/icons/status-error.svg";
import { currencyFormat } from "@/core/helpers";

type PropTypes = { data?: PaymentOrderResult };
export default function PaymentView(props: PropTypes) {
  const { data } = props;

  return (
    <div className={styles.root}>
      <AppBar className={styles.header} elevation={1}>
        <Toolbar>
          <Image src={LOGO} width={100} height={40} />
        </Toolbar>
      </AppBar>
      {data ? (
        <Container className={styles.content}>
          <div className={styles.centerContent}>
            <Image src={data.success ? SUCCESS_ICON : ERROR_ICON} />
            <Typography className={styles.title}>{data.title}</Typography>
            <Typography className={styles.message}>
              {data.description}
            </Typography>
            {data.success && (
              <div className={styles.amountBox}>
                <Typography className={styles.label} component="span">
                  مبلغ پرداخت شده:
                </Typography>
                <Typography className={styles.value} component="span">
                  <Typography component="span">
                    {currencyFormat(data.amount)}
                  </Typography>{" "}
                  تومان
                </Typography>
              </div>
            )}
          </div>
          <Link href={data.link} replace>
            <Button variant="contained" className={styles.button}>
              بازگشت به کریپو
            </Button>
          </Link>
        </Container>
      ) : null}
    </div>
  );
}
