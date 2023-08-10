import styles from "../../utils/auth-modal.module.scss";
import { Typography } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import { FTextField } from "@/core/components/form/formik-elements";
import LoadingButton from "@/core/components/common/loading-button";

type PropTypes = {
  schema: any;
  handleSubmit: (value: any, helpers: FormikHelpers<any>) => void;
};
export default function AuthPhoneFormView(props: PropTypes) {
  const { schema, handleSubmit } = props;
  return (
    <Formik
      validationSchema={schema}
      initialValues={{ phoneNumber: "" }}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values }) => (
        <Form>
          <Typography component="h2" className={styles.title}>
            به کریپو خوش آمدید.
          </Typography>
          <Typography className={styles.description}>
            برای ورود یا ثبت نام، لطفا شماره موبایل خود را وارد کنید.
          </Typography>
          <FTextField
            name="phoneNumber"
            label="شماره تلفن"
            type="phoneNumber"
            InputLabelProps={{ shrink: true }}
          />
          <LoadingButton
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            disabled={isSubmitting || values.phoneNumber.length !== 11}
            className={styles.submitButton}
            loading={isSubmitting}
          >
            ادامه
          </LoadingButton>
        </Form>
      )}
    </Formik>
  );
}
