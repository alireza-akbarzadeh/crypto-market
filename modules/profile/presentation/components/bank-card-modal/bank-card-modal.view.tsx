import styles from "../../utils/profile-modals.module.scss";
import { Button, DialogContent, Divider, Typography } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import CustomDialog from "@/core/components/common/custom-dialog";
import { FTextField } from "@/core/components/form/formik-elements";
import { UserInterface } from "@/modules/auth/domain/entities/user";
import AppDialogComponent from "@/core/components/common/app-dialog";
import { BankCardInquiry } from "@/modules/profile/domain/entities/bank-card";
import { splitString } from "@/core/helpers";

type PropTypes = {
  user?: UserInterface;
  isBankCardModalOpen: boolean;
  closeBankCardModal: () => void;
  onSubmit: (values: any, helpers: FormikHelpers<any>) => void;
  isConfirmOpen: boolean;
  closeConfirm: () => void;
  confirmData?: BankCardInquiry;
  handleConfirm: () => void;
  schema: any;
};
export default function BankCardModalView(props: PropTypes) {
  const {
    user,
    isBankCardModalOpen,
    closeBankCardModal,
    onSubmit,
    isConfirmOpen,
    closeConfirm,
    confirmData,
    handleConfirm,
    schema,
  } = props;
  if (!user) return null;
  return (
    <>
      <AppDialogComponent
        className={styles.root}
        contentClassName={styles.content}
        open={isBankCardModalOpen}
        onClose={closeBankCardModal}
        closeOnOutside={false}
        title="ثبت کارت جدید"
        mobileStyle={2}
      >
        <Typography className={styles.desc}>
          شما فقط مجاز به ثبت کارت بانکی به نام
          <Typography component="span" fontWeight={600}>
            {` ${user.fullName} `}
          </Typography>
          هستید.
        </Typography>
        <Formik
          validationSchema={schema}
          onSubmit={onSubmit}
          initialValues={{ cardNumber: "" }}
        >
          {({ values, errors }) => (
            <Form>
              <FTextField
                name="cardNumber"
                inputProps={{
                  className: "text-center ltr",
                }}
                label="شماره کارت"
                type="bankCard"
              />
              <Button
                className={styles.button}
                disabled={values.cardNumber.length < 16}
                variant="contained"
                fullWidth
                type="submit"
              >
                استعلام
              </Button>
            </Form>
          )}
        </Formik>
      </AppDialogComponent>

      <AppDialogComponent
        className={styles.root}
        contentClassName={styles.content}
        open={isConfirmOpen}
        onClose={closeConfirm}
        closeOnOutside={false}
        title="ثبت کارت جدید"
        fullScreenMobile={false}
        mobileStyle={3}
      >
        <Typography className={styles.desc} variant="body2">
          در صورت صحیح بودن اطلاعات، دکمه ثبت را انتخاب کنید.
        </Typography>
        <div className={styles.dataContainer}>
          <div className={styles.dataRow}>
            <Typography component="span">شماره کارت:‌ </Typography>
            <Typography
              component="span"
              className="inline-ltr"
              color="success.main"
            >
              {splitString(confirmData?.cardNumber, 4, " ")}
            </Typography>
          </div>
          <Divider />
          <div className={styles.dataRow}>
            <Typography component="span">بانک صادر کننده: </Typography>
            <Typography
              component="span"
              className="inline-ltr"
              color="success.main"
            >
              {confirmData?.origin}
            </Typography>
          </div>
          <Divider />
          <div className={styles.dataRow}>
            <Typography component="span">صاحب کارت: </Typography>
            <Typography
              component="span"
              className="inline-ltr"
              color="success.main"
            >
              {confirmData?.name}
            </Typography>
          </div>
        </div>
        <div className={styles.actions}>
          <Button onClick={closeConfirm} fullWidth variant="outlined">
            ویرایش
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={handleConfirm}
            disabled={!confirmData?.trackId}
          >
            ثبت
          </Button>
        </div>
      </AppDialogComponent>
    </>
  );
}
