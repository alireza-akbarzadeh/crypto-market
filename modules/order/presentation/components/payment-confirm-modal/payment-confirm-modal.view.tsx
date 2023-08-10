import styles from "./payment-confirm-modal.module.scss";
import { Button, Divider, Typography } from "@mui/material";
import { Formik, Form, FormikHelpers } from "formik";
import { FCodeInput } from "@/core/components/form/formik-elements";
import { currencyFormat } from "@/core/helpers";
import { UserInterface } from "@/modules/auth/domain/entities/user";
import AppDialogComponent from "@/core/components/common/app-dialog";
import clsx from "clsx";
import { useMemo } from "react";
import { PurchasePaymentResult } from "@/modules/order/domain/entities/payment";

type PropTypes = {
  open: boolean;
  onClose: () => void;
  schema: any;
  onSubmit: (values: any, helpers: FormikHelpers<any>) => void;
  user: UserInterface;
  data?: PurchasePaymentResult;
};
export default function PaymentConfirmModalView(props: PropTypes) {
  const { open, onClose, schema, onSubmit, user, data } = props;

  return (
    <AppDialogComponent
      contentClassName={styles.content}
      closeOnOutside={false}
      className={styles.root}
      open={open}
      onClose={onClose}
      title="برداشت وجه"
      mobileStyle={3}
      fullScreenMobile={false}
    >
      <div className="text-center">
        <Formik
          validationSchema={schema}
          initialValues={{ code: "" }}
          onSubmit={onSubmit}
        >
          {({ values, isSubmitting, errors }) => (
            <Form>
              <div className={styles.dataContainer}>
                {Boolean(data?.remaining) && (
                  <Typography className={styles.notEnough}>
                    موجودی کیف پول شما کافی نیست!
                  </Typography>
                )}
                <div className={clsx(styles.dataRow, styles.primary)}>
                  <Typography component="span" className={styles.label}>
                    موجودی کیف پول:
                  </Typography>
                  <Typography component="span" className={styles.value}>
                    <span>{currencyFormat(data?.balance)}</span> تومان
                  </Typography>
                </div>
                <div
                  className={clsx({
                    [styles.dataRow]: true,
                    [styles.successBox]: !data?.remaining,
                  })}
                >
                  <Typography component="span" className={styles.label}>
                    مبلغ کل سفارش:
                  </Typography>
                  <Typography component="span" className={styles.value}>
                    <span>{currencyFormat(data?.total)}</span> تومان
                  </Typography>
                </div>
                {Boolean(data?.remaining) && (
                  <div className={clsx(styles.dataRow, styles.successBox)}>
                    <Typography component="span" className={styles.label}>
                      مبلغی که پرداخت می‌کنید:
                    </Typography>
                    <Typography component="span" className={styles.value}>
                      <span>{currencyFormat(data?.remaining)}</span> تومان
                    </Typography>
                  </div>
                )}
              </div>
              {data?.otp && (
                <>
                  <Typography sx={{ mb: 5, mt: 2 }}>
                    کد تایید پرداخت برای شماره
                    <span className="strong"> {user.phoneNumber} </span>
                    ارسال شده است.
                  </Typography>
                  <Typography sx={{ mb: 2 }} variant="h6" fontWeight={700}>
                    کد تایید را وارد کنید
                  </Typography>
                  <FCodeInput name="code" length={6} />
                </>
              )}
              <Button
                className={styles.submitButton}
                color="primary"
                variant="contained"
                type="submit"
                disabled={isSubmitting || (data?.otp && values.code.length < 6)}
                sx={{ mt: 2, minWidth: 110 }}
              >
                {data?.remaining ? "انتقال به درگاه" : "پرداخت"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </AppDialogComponent>
  );
}
