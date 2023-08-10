import styles from "./withdraw-confirm-modal.module.scss";
import { Button, Divider, Typography } from "@mui/material";
import { Formik, Form, FormikHelpers } from "formik";
import { FCodeInput } from "@/core/components/form/formik-elements";
import { currencyFormat } from "@/core/helpers";
import { WithdrawRequestConfirm } from "@/modules/wallet/domain/entities/wallet";
import { UserInterface } from "@/modules/auth/domain/entities/user";
import AppDialogComponent from "@/core/components/common/app-dialog";
import LoadingButton from "@/core/components/common/loading-button";

type PropTypes = {
  open: boolean;
  onClose: () => void;
  schema: any;
  onSubmit: (values: any, helpers: FormikHelpers<any>) => void;
  data?: WithdrawRequestConfirm;
  user: UserInterface;
};
export default function WithdrawConfirmModalView(props: PropTypes) {
  const { open, onClose, schema, onSubmit, data, user } = props;
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
          {({ values, isSubmitting }) => (
            <Form>
              <div className={styles.dataContainer}>
                <div className={styles.dataRow}>
                  <Typography component="span">زمان واریز: </Typography>
                  <Typography component="span" color="success.main">
                    {data?.date}
                  </Typography>
                </div>
                <Divider />
                <div className={styles.dataRow}>
                  <Typography component="span">مبلغ برداشت: </Typography>
                  <span>
                    <Typography
                      component="span"
                      className="inline-ltr"
                      color="success.main"
                    >
                      {currencyFormat(data?.amount)}
                    </Typography>
                    <Typography
                      component="span"
                      sx={{ fontWeight: "400 !important" }}
                    >
                      {" "}
                      تومان
                    </Typography>
                  </span>
                </div>
                <Divider />
                <div className={styles.dataRow}>
                  <Typography component="span">صاحب حساب: </Typography>
                  <Typography component="span" color="success.main">
                    {data?.name}
                  </Typography>
                </div>
                <Divider className="mobile-down" />
              </div>
              <Typography
                className="mobile-down"
                sx={{ mb: 1, mt: 2 }}
                variant="body2"
              >
                لطفا کد ارسال شده به شماره
                <span className="strong"> {user.phoneNumber} </span>
                را وارد کنید
              </Typography>
              <div className="mobile-up">
                <Typography sx={{ mb: 5, mt: 2 }} variant="body2">
                  کد تایید برای شماره
                  <span className="strong"> {user.phoneNumber} </span>
                  ارسال شده است.
                </Typography>
                <Typography sx={{ mb: 2 }} variant="h5" fontWeight={700}>
                  کد تایید را وارد کنید
                </Typography>
              </div>
              <FCodeInput name="code" length={6} />
              <LoadingButton
                className={styles.submitButton}
                color="primary"
                variant="contained"
                type="submit"
                loading={isSubmitting}
                disabled={isSubmitting || values.code.length < 6}
                sx={{ mt: 2, minWidth: 110 }}
              >
                تایید برداشت
              </LoadingButton>
            </Form>
          )}
        </Formik>
      </div>
    </AppDialogComponent>
  );
}
