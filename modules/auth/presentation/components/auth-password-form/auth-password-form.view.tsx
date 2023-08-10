import styles from "../../utils/auth-modal.module.scss";
import { Button, Typography } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import { FTextField } from "@/core/components/form/formik-elements";
import LoadingButton from "@/core/components/common/loading-button";
import TextButtonComponent from "@/core/components/common/text-button";
import clsx from "clsx";

export type AuthLoginPasswordFormValues = { password: string };
type PropTypes = {
  schema: any;
  onSubmit: (
    values: AuthLoginPasswordFormValues,
    helpers: FormikHelpers<AuthLoginPasswordFormValues>
  ) => void;
  resetPhoneNumber: () => void;
  forgetPassword: () => void;
  phoneNumber?: string;
};
export default function AuthPasswordFormView(props: PropTypes) {
  const { schema, onSubmit, resetPhoneNumber, phoneNumber, forgetPassword } =
    props;
  return (
    <Formik
      validationSchema={schema}
      initialValues={{ password: "" }}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Typography component="h2" className={styles.title}>
            رمز عبور را وارد کنید.
          </Typography>
          {/* <Typography sx={{ mb: 1.5 }}>
            لطفا رمز عبور شماره
            <Typography fontWeight={700} component="span">
              {" "}
              {phoneNumber}{" "}
            </Typography> */}
          {/* را وارد کنید.
          </Typography> */}

          {/* <div className="mobile-up">
            <Typography className={styles.description}>
              آیا شماره موبایل اشتباه است؟
              <TextButtonComponent onClick={resetPhoneNumber}>
                ویرایش شماره
              </TextButtonComponent>
            </Typography>
          </div> */}
          <FTextField
            name="password"
            type="password"
            label="رمز عبور"
            // placeholder="*********"
          />
          <Typography className="mobile-up" sx={{ mb: 5 }}>
            آیا رمز عبور خود را فراموش کرده‌اید؟
            <TextButtonComponent onClick={forgetPassword}>
              بازیابی رمز عبور
            </TextButtonComponent>
          </Typography>
          <LoadingButton
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            loading={isSubmitting}
            className={styles.submitButton}
          >
            تایید
          </LoadingButton>
          <div className={clsx(styles.formFooter, "mobile-down")}>
            {/* <Button onClick={resetPhoneNumber} variant="text">
              تغییر شماره تلفن
            </Button>
            <Typography component="span" color="primary.main">
              |
            </Typography> */}
            <Button variant="text" onClick={forgetPassword}>
              بازیابی رمز عبور
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
