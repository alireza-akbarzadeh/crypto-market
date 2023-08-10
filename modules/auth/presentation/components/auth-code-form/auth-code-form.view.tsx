import styles from "../../utils/auth-modal.module.scss";
import { Button, Typography } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import { FCodeInput, FTextField } from "@/core/components/form/formik-elements";
import { useDateTimer } from "@/core/hooks";
import LoadingButton from "@/core/components/common/loading-button";
import TextButtonComponent from "@/core/components/common/text-button";
import clsx from "clsx";
import LoadingComponent from "@/core/components/common/loading";

type PropTypes = {
  phoneNumber?: string;
  time?: any;
  resetPhoneNumber?: () => void;
  handleSubmit: (
    values: { code: string },
    formikHelpers: FormikHelpers<any>
  ) => void | Promise<any>;
  resendCode: () => void;
  resending: boolean;
  title?: string;
};
export default function AuthCodeFormView(props: PropTypes) {
  const {
    phoneNumber,
    resetPhoneNumber,
    time,
    handleSubmit,
    resendCode,
    resending,
    title,
  } = props;
  const timer = useDateTimer(time);

  return (
    <Formik initialValues={{ code: "" }} onSubmit={handleSubmit}>
      {({ isSubmitting, resetForm, values, submitForm, handleSubmit }) => (
        <Form>
          <div className="mobile-down">
            {title ? (
              <Typography
                className={styles.headTitle}
                component="h2"
                variant="h4"
                fontWeight={700}
              >
                {title}
              </Typography>
            ) : null}
            <Typography component="h2" className={styles.title}>
              کد تایید را وارد کنید.
            </Typography>
            <Typography className={styles.description}>
              لطفا کد پیامک شده به شماره
              <Typography component="span" fontWeight={700}>
                {" "}
                {phoneNumber}{" "}
              </Typography>
              را وارد کنید.
            </Typography>
          </div>
          <div className="mobile-up">
            <Typography sx={{ mb: 1.5 }}>
              کد تایید برای شماره
              <Typography component="span" fontWeight={700}>
                {" "}
                {phoneNumber}{" "}
              </Typography>
              ارسال شده است.
            </Typography>

            {Boolean(resetPhoneNumber) && (
              <Typography className={styles.description}>
                آیا شماره موبایل اشتباه است؟
                <TextButtonComponent onClick={resetPhoneNumber}>
                  ویرایش شماره
                </TextButtonComponent>
              </Typography>
            )}
            <Typography component="h4" variant="h6" fontWeight="700">
              کد تایید را وارد کنید
            </Typography>
          </div>
          <div className={styles.codeInputWrapper}>
            <FCodeInput
              name="code"
              length={6}
              // fast={false}
              onChange={(c) => {
                if (c.length === 6) {
                  submitForm();
                }
              }}
            />
          </div>
          <div className="mobile-up">
            {Boolean(timer) ? (
              <Typography className={styles.resendText}>
                ارسال دوباره کد تایید تا {timer} دیگر
              </Typography>
            ) : (
              <Typography className={styles.resendText}>
                آیا کد تایید را دریافت نکردید؟
                <TextButtonComponent
                  onClick={() => {
                    resetForm();
                    return resendCode();
                  }}
                  disabled={Boolean(timer || resending)}
                >
                  ارسال دوباره
                </TextButtonComponent>
              </Typography>
            )}
          </div>
          {isSubmitting && <LoadingComponent />}
          {/* <LoadingButton
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            disabled={isSubmitting || values.code.length !== 6}
            loading={isSubmitting}
            className={styles.submitButton}
          >
            تایید
          </LoadingButton> */}
          <div className={clsx(styles.formFooter, "mobile-down")}>
            {Boolean(resetPhoneNumber) && (
              <>
                <Button onClick={resetPhoneNumber} variant="text">
                  تغییر شماره تلفن
                </Button>
                <Typography component="span" color="primary.main">
                  |
                </Typography>
              </>
            )}
            <LoadingButton
              onClick={() => {
                resetForm();
                return resendCode();
              }}
              disabled={Boolean(timer)}
              variant="text"
              loading={resending}
            >
              ارسال مجدد کد{timer ? ` (${timer})` : ""}
            </LoadingButton>
          </div>
        </Form>
      )}
    </Formik>
  );
}
