import styles from "../../utils/auth-modal.module.scss";
import { Button, Typography } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import { FTextField } from "@/core/components/form/formik-elements";
import LoadingButton from "@/core/components/common/loading-button";

export type AuthSetNameFormValues = { firstName: string; lastName: string };

type PropTypes = {
  schema: any;
  onSubmit: (model: AuthSetNameFormValues) => void;
};
export default function AuthSetNameView(props: PropTypes) {
  const { schema, onSubmit } = props;
  return (
    <Formik
      validationSchema={schema}
      initialValues={{ firstName: "", lastName: "" }}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="mobile-down">
            <Typography className={styles.description}>
              لطفا نام و نام خانوادگی خود را وارد کنید.
            </Typography>
          </div>
          <div className="mobile-up">
            <Typography className={styles.description}>
              برای ثبت نام، لطفا نام و نام خانوادگی خود را وارد کنید.
            </Typography>
          </div>
          <FTextField name="firstName" label="نام" />
          <FTextField name="lastName" label="نام خانوادگی" />
          <LoadingButton
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            className={styles.submitButton}
          >
            ادامه
          </LoadingButton>
        </Form>
      )}
    </Formik>
  );
}
