import { Button, Divider, Paper, Skeleton, Typography } from "@mui/material";
import sectionStyles from "../../utils/purchasing-steps.module.scss";
import styles from "./purchasing-payment.module.scss";
import { UserInterface } from "@/modules/auth/domain/entities/user";
import { calcBankFee, currencyFormat } from "@/core/helpers";
import clsx from "clsx";
import WalletIcon from "@mui/icons-material/AccountBalanceWalletTwoTone";
import { WalletBalanceInterface } from "@/modules/wallet/domain/entities/wallet";
import { useMemo } from "react";
import LoadingButton from "@/core/components/common/loading-button";

type PropTypes = {
  handlePrev: () => void;
  handleNext: () => void;
  user?: UserInterface;
  data?: {
    balance: WalletBalanceInterface;
    totalPrice: number;
  };
};
export default function PurchasingPaymentView(props: PropTypes) {
  const { handleNext, handlePrev, data } = props;
  const enough = useMemo(() => {
    if (!data) return true;
    return data.balance.available >= data.totalPrice;
  }, [data]);

  return (
    <section>
      <Typography
        component="h2"
        className={clsx(sectionStyles.stepTitle, "mobile-down")}
      >
        گام چهارم: پرداخت
      </Typography>
      <Paper className={sectionStyles.paper}>
        <Typography
          component="h2"
          className={clsx(sectionStyles.stepTitle, "mobile-up")}
        >
          <span className={sectionStyles.stepPart}>گام چهارم:</span> پرداخت
        </Typography>

        <div className={styles.mainContent}>
          <div className={styles.inventory}>
            <div className={styles.content}>
              <WalletIcon className={styles.icon} />
              <div className={styles.values}>
                <Typography component="h6" className={styles.label}>
                  کیف پول
                </Typography>
                <Typography component="div" className={styles.value}>
                  موجودی:{" "}
                  {data ? (
                    <>
                      <span className={styles.amount}>
                        {currencyFormat(data.balance.available)}
                      </span>{" "}
                      تومان
                    </>
                  ) : (
                    <Skeleton width={100} sx={{ display: "inline-flex" }} />
                  )}
                </Typography>
              </div>
            </div>
            {data ? (
              <Typography
                component="div"
                className={clsx(
                  styles.badge,
                  enough ? styles.success : styles.error
                )}
              >
                موجودی {enough ? "کافی" : "ناکافی"}
              </Typography>
            ) : null}
          </div>
          <div className={styles.invoice}>
            <div className={styles.item}>
              <Typography component="span" className={styles.label}>
                مبلغ سفارش:
              </Typography>
              <Typography component="span" className={styles.value}>
                {data ? (
                  <>
                    <span>{currencyFormat(data.totalPrice)}</span> تومان
                  </>
                ) : (
                  <Skeleton width={120} />
                )}
              </Typography>
            </div>
            <div className={clsx(styles.item, styles.primary)}>
              <Typography component="span" className={styles.label}>
                موجودی فعلی کیف پول:
              </Typography>
              <Typography component="span" className={styles.value}>
                {data ? (
                  `${currencyFormat(data.balance.available)} تومان`
                ) : (
                  <Skeleton width={120} />
                )}
              </Typography>
            </div>
            {!enough && data && (
              <>
                <Divider />
                <div className={styles.payable}>
                  <Typography component="span" className={styles.label}>
                    مبلغی که پرداخت می‌کنید:
                  </Typography>
                  <Typography component="span" className={styles.value}>
                    <span>
                      {currencyFormat(data.totalPrice - data.balance.available)}
                    </span>{" "}
                    تومان
                  </Typography>
                </div>
                <Typography
                  sx={{ mt: 0.5 }}
                  color="text.secondary"
                  variant="body2"
                >
                  {currencyFormat(
                    calcBankFee(data.totalPrice - data.balance.available)
                  )}{" "}
                  تومان کارمزد درگاه بانکی به مبلغ فوق اضافه میگردد.
                </Typography>
              </>
            )}
          </div>
        </div>

        <Paper className={sectionStyles.footer}>
          <Button onClick={handlePrev} variant="outlined">
            بازگشت
          </Button>
          <LoadingButton
            onClick={handleNext}
            variant="contained"
            disabled={!data}
          >
            پرداخت
          </LoadingButton>
        </Paper>
      </Paper>
    </section>
  );
}
