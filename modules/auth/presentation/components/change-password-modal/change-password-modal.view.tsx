import AppDialogComponent from "@/core/components/common/app-dialog";
import { Form, Formik } from "formik";
import styles from "../../utils/auth-modal.module.scss";
import yupSchema from "@/core/helpers/yupSchema";
import * as Yup from "yup";
import { FTextField } from "@/core/components/form/formik-elements";
import RegListCheckerComponent from "@/core/components/form/reg-list-checker";
import {
  PASSWORD_REG__8CHAR,
  PASSWORD_REG__CASE_SENSE,
  PASSWORD_REG__TYPE,
} from "@/core/constants/regex";
import LoadingButton from "@/core/components/common/loading-button";
import AuthCodeFormComponent from "../auth-code-form";
import AuthSetPasswordFormComponent from "../auth-set-password-form";
import { AuthSetPasswordFormValues } from "../auth-set-password-form/auth-set-password-form.view";

const schema = Yup.object().shape({
  oldPassword: yupSchema.password,
  password: yupSchema.newPassword,
  confirmPassword: yupSchema.confirmPassword,
});
export enum ChangePasswordModalState {
  Initial,
  Otp,
  SetNew,
}
export type AuthChangePasswordFormValues = {
  oldPassword: string;
  password: string;
  confirmPassword: string;
};
type PropTypes = {
  open: boolean;
  onClose: () => void;
  openForget: () => void;
  onSubmit: (values: AuthChangePasswordFormValues) => void;
  state: ChangePasswordModalState;

  phoneNumber?: string;
  submitForgetCode: (code: string) => void;
  time?: number;
  resendForgetCode: () => void;
  submitForgetPassword: (model: AuthSetPasswordFormValues) => void;
};
export default function ChangePasswordModalView(props: PropTypes) {
  const {
    open,
    onClose,
    onSubmit,
    openForget,
    state,

    phoneNumber,
    submitForgetCode,
    time,
    resendForgetCode,

    submitForgetPassword,
  } = props;

  const renderContent = () => {
    switch (state) {
      case ChangePasswordModalState.Otp:
        return (
          <AuthCodeFormComponent
            phoneNumber={phoneNumber}
            onSubmit={submitForgetCode}
            time={time}
            resendCode={resendForgetCode}
          />
        );
      case ChangePasswordModalState.SetNew:
        return (
          <AuthSetPasswordFormComponent
            onSubmit={submitForgetPassword}
            forget
          />
        );
      default:
        return (
          <Formik
            onSubmit={onSubmit}
            initialValues={
              {
                oldPassword: "",
                password: "",
                confirmPassword: "",
              } as any
            }
            validationSchema={schema}
          >
            {({ values, isSubmitting, resetForm, errors, validateForm }) => (
              <Form>
                <FTextField
                  name="oldPassword"
                  label="رمز عبور فعلی"
                  type="password"
                />
                <FTextField
                  name="password"
                  label="رمز عبور جدید"
                  type="password"
                  autoComplete="new-password"
                />
                <FTextField
                  name="confirmPassword"
                  label="تکرار رمز عبور جدید"
                  type="password"
                  autoComplete="new-password"
                />
                <RegListCheckerComponent
                  title="رمز عبور وارد شده باید:"
                  value={values.password}
                  list={[
                    {
                      title: "دارای حد اقل ۸ کاراکتر باشد",
                      reg: PASSWORD_REG__8CHAR,
                    },
                    {
                      title: "ترکیبی از اعداد و حروف انگلیسی باشد",
                      reg: PASSWORD_REG__TYPE,
                    },
                    {
                      title: "شامل حروف کوچک و بزرگ باشد",
                      reg: PASSWORD_REG__CASE_SENSE,
                    },
                  ]}
                />
                <LoadingButton
                  fullWidth
                  sx={{ mb: 1 }}
                  loading={isSubmitting}
                  onClick={openForget}
                >
                  رمز عبور خود را فراموش کرده‌ام
                </LoadingButton>
                <LoadingButton
                  variant="contained"
                  fullWidth
                  type="submit"
                  className={styles.submitButton}
                  loading={isSubmitting}
                >
                  تغییر رمزعبور
                </LoadingButton>
              </Form>
            )}
          </Formik>
        );
    }
  };
  return (
    <AppDialogComponent
      classes={{ paper: styles.paper }}
      contentClassName={styles.content}
      closeOnOutside={false}
      className={styles.root}
      open={open}
      onClose={onClose}
      title={
        state === ChangePasswordModalState.Initial
          ? "تغییر رمز عبور"
          : "فراموشی رمز عبور"
      }
      mobileStyle={2}
      headerClassName={styles.header}
    >
      {renderContent()}
    </AppDialogComponent>
  );
}
