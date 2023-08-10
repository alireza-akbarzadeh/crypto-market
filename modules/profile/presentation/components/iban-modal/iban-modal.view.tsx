import styles from "../../utils/profile-modals.module.scss";
import {
  Button,
  DialogContent,
  Divider,
  InputAdornment,
  Typography,
} from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import CustomDialog from "@/core/components/common/custom-dialog";
import { FTextField } from "@/core/components/form/formik-elements";
import { UserInterface } from "@/modules/auth/domain/entities/user";
import AppDialogComponent from "@/core/components/common/app-dialog";
import { IbanInquiry } from "@/modules/profile/domain/entities/iban";
import { splitString } from "@/core/helpers";

type PropTypes = {
  user?: UserInterface;
  isIbanModalOpen: boolean;
  closeIbanModal: () => void;
  onSubmit: (values: any, helpers: FormikHelpers<any>) => void;
  isConfirmOpen: boolean;
  closeConfirm: () => void;
  onConfirm: () => void;
  confirmData?: IbanInquiry;
};
export default function IbanModalView(props: PropTypes) {
  const {
    user,
    isIbanModalOpen,
    closeIbanModal,
    onSubmit,
    isConfirmOpen,
    closeConfirm,
    onConfirm,
    confirmData,
  } = props;
  if (!user) return null;
  return (
    <>
      <AppDialogComponent
        className={styles.root}
        contentClassName={styles.content}
        open={isIbanModalOpen}
        onClose={closeIbanModal}
        closeOnOutside={false}
        title="ثبت کارت جدید"
        mobileStyle={2}
      >
        <Typography className={styles.desc}>
          شما فقط مجاز به ثبت شبای بانکی به نام
          <Typography component="span" fontWeight={600}>
            {` ${user.fullName} `}
          </Typography>
          هستید.
        </Typography>
        <Formik onSubmit={onSubmit} initialValues={{ ibanNumber: "" }}>
          {({ values }) => (
            <Form>
              <FTextField
                name="ibanNumber"
                inputProps={{
                  className: "text-center ltr",
                }}
                label="شبای بانکی"
                type="iban"
                // InputProps={{
                //   endAdornment: (
                //     <InputAdornment position="end">IR</InputAdornment>
                //   ),
                // }}
              />
              <Button
                className={styles.button}
                disabled={values.ibanNumber.length < 24}
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
        <Typography variant="body2">
          در صورت صحیح بودن اطلاعات، دکمه ثبت را انتخاب کنید.
        </Typography>
        <div className={styles.dataContainer}>
          <div className={styles.dataRow}>
            <Typography component="span">شبای بانکی:‌ </Typography>
            <Typography
              component="span"
              className="inline-ltr"
              color="success.main"
            >
              {splitString(confirmData?.ibanNumber, 4, " ")}
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
            <Typography component="span">صاحب حساب: </Typography>
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
          <Button onClick={onConfirm} fullWidth variant="contained">
            ثبت
          </Button>
          <Button onClick={closeConfirm} fullWidth variant="outlined">
            ویرایش
          </Button>
        </div>
      </AppDialogComponent>
    </>
  );
}
