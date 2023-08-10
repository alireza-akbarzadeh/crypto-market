import styles from "../../utils/auth-modal.module.scss";
import { Button, Typography } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import { FTextField } from "@/core/components/form/formik-elements";
import LoadingButton from "@/core/components/common/loading-button";
import RegListCheckerComponent from "@/core/components/form/reg-list-checker";
import {
  PASSWORD_REG__8CHAR,
  PASSWORD_REG__CASE_SENSE,
  PASSWORD_REG__TYPE,
} from "@/core/constants/regex";

export type AuthSetPasswordFormValues = {
  password: string;
};

type PropTypes = {
  onSubmit: (
    values: AuthSetPasswordFormValues,
    helpers: FormikHelpers<any>
  ) => void;
  schema: any;
  forget?: boolean;
};
export default function AuthSetPasswordFormView(props: PropTypes) {
  const { onSubmit, schema, forget } = props;
  return (
    <Formik
      validationSchema={schema}
      initialValues={{ password: "", confirmPassword: "" }}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, values }) => (
        <Form>
          {/* <Typography className={styles.description}>رمز عبور جدید را تعیین کنید.</Typography> */}
          <Typography className={styles.description}>
            لطفا رمز عبور {forget ? "جدید" : ""} خود را تعیین کنید.
          </Typography>
          <FTextField
            name="password"
            label="رمز عبور"
            type="password"
            autoComplete="new-password"
          />
          <FTextField
            name="confirmPassword"
            label="تکرار رمز عبور"
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
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            className={styles.submitButton}
            loading={isSubmitting}
          >
            {/* ثبت */}
            تایید رمز عبور
          </LoadingButton>
        </Form>
      )}
    </Formik>
  );
}
