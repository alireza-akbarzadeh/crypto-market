import styles from "./user-info-modal.module.scss";
import {
  Dialog,
  DialogContent,
  Typography,
  Paper,
  IconButton,
} from "@mui/material";
import { Formik, Form } from "formik";
import warningStatusIcon from "@/public/icons/status-warning.svg";
import Image from "next/image";
import {
  FTextField,
  FDatePicker,
} from "@/core/components/form/formik-elements";
import LoadingButton from "@/core/components/common/loading-button";
import AppDialogComponent from "@/core/components/common/app-dialog";
import { UserInfoFormValues } from "@/modules/profile/domain/entities/form-values";

type PropTypes = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: UserInfoFormValues) => void;
  schema: any;
};
export default function UserInfoModalView(props: PropTypes) {
  const { isOpen, onClose, onSubmit, schema } = props;
  return (
    <AppDialogComponent
      className={styles.root}
      open={isOpen}
      contentClassName={styles.content}
      onClose={onClose}
      closeOnOutside={false}
      title="تکمیل اطلاعات کاربری"
      mobileStyle={3}
    >
      <DialogContent className={styles.content}>
        <div className={styles.contentHeader}>
          <div className={styles.imageWrapper}>
            <Image src={warningStatusIcon} />
          </div>
          <Typography component="h2" fontWeight={700}>
            تکمیل اطلاعات کاربری
          </Typography>
        </div>
        <Formik
          onSubmit={onSubmit}
          initialValues={
            {
              fatherName: "",
              nationalCode: "",
              birthDate: "",
            } as any
          }
          validationSchema={schema}
        >
          {({ isSubmitting, values, errors }) => (
            <Form>
              <Paper className={styles.paper}>
                <Typography className={styles.desc}>
                  کاربر گرامی، برای ادامه فرایند خرید یا فروش لازم است اطلاعات
                  کاربری خود را تکمیل کنید.
                </Typography>
                <FTextField name="fatherName" label="نام پدر" />
                <FDatePicker
                  name="birthDate"
                  helperText="تاریخ تولد خود را وارد کنید."
                  stringDate
                />
                <FTextField
                  name="nationalCode"
                  label="کد ملی"
                  type="nationalCode"
                />
                <LoadingButton
                  className={styles.button}
                  variant="contained"
                  fullWidth
                  type="submit"
                  loading={isSubmitting}
                >
                  ثبت
                </LoadingButton>
              </Paper>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </AppDialogComponent>
  );
}
