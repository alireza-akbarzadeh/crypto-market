import AppDialogComponent from "@/core/components/common/app-dialog";
import LoadingButton from "@/core/components/common/loading-button";
import { FTextField } from "@/core/components/form/formik-elements";
import { UserCommentsFormValues } from "@/modules/app-properties/domain/entities/form-values";
import { Typography } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import styles from "./compose-comment-modal.module.scss";

type PropTypes = {
  open: boolean;
  onClose: () => void;
  schema: any;
  onSubmit: (
    values: UserCommentsFormValues,
    helper: FormikHelpers<UserCommentsFormValues>
  ) => void;
};
export default function ComposeCommentModalView(props: PropTypes) {
  const { open, onClose, schema, onSubmit } = props;
  return (
    <AppDialogComponent
      open={open}
      onClose={onClose}
      mobileStyle={4}
      className={styles.root}
      contentClassName={styles.container}
      // headerClassName="d-none"
      title="ثبت نظر جدید"
    >
      <Formik
        validationSchema={schema}
        onSubmit={onSubmit}
        initialValues={{ message: "" }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Typography fontWeight={500} className="mobile-down">
              ثبت نظر جدید
            </Typography>
            <FTextField
              name="message"
              placeholder="تجربه خود از کریپو را در اینجا به اشتراک بگذارید."
              rows={5}
              multiline
            />
            <LoadingButton
              loading={isSubmitting}
              type="submit"
              className={styles.submitButton}
              variant="contained"
              fullWidth
            >
              ثبت نظر
            </LoadingButton>
          </Form>
        )}
      </Formik>
    </AppDialogComponent>
  );
}
