import styles from "../../utils/profile-modals.module.scss";
import { Alert, Typography } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import {
  FCoinAutoComplete,
  FNetworkSelect,
  FTextField,
} from "@/core/components/form/formik-elements";
import { UserInterface } from "@/modules/auth/domain/entities/user";
import AppDialogComponent from "@/core/components/common/app-dialog";
import {
  NetworkType,
  WalletAddressCoinInterface,
} from "@/modules/wallet/domain/entities/coin";
import { CreateWalletAddressFormValues } from "@/modules/wallet/domain/entities/form-values";
import LoadingButton from "@/core/components/common/loading-button";
import { PurchaseStepsData } from "@/modules/order/domain/entities/order";

type PropTypes = {
  user?: UserInterface;
  open: boolean;
  data?: PurchaseStepsData["cart"];
  closeAddressModal: () => void;
  onSubmit: (values: any, helpers: FormikHelpers<any>) => void;
  schema: any;
  handleCoinSelect: (coin: WalletAddressCoinInterface) => void;
  handleNetworkSelect: (network: NetworkType) => void;
  formikRef: any;
};
export default function WalletAddressModalView(props: PropTypes) {
  const {
    user,
    open,
    data,
    closeAddressModal,
    onSubmit,
    schema,
    handleCoinSelect,
    handleNetworkSelect,
    formikRef,
  } = props;
  if (!user) return null;
  return (
    <AppDialogComponent
      contentClassName={styles.content}
      closeOnOutside={false}
      className={styles.root}
      open={open}
      onClose={closeAddressModal}
      title="افزودن آدرس ارزی"
      mobileStyle={2}
    >
      <Formik
        onSubmit={onSubmit}
        initialValues={
          {
            coin: data?.coinId ? { id: data.coinId } : undefined,
            network: data?.network,
            address: "",
            tag: "",
            title: "",
          } as CreateWalletAddressFormValues
        }
        validationSchema={schema}
        innerRef={formikRef}
      >
        {({ values, isSubmitting, resetForm, errors, validateForm }) => (
          <Form>
            {!data && (
              <FCoinAutoComplete
                name="coin"
                onChange={(coin) => {
                  handleCoinSelect(coin);
                  resetForm();
                }}
              />
            )}
            {Boolean(values.coin && !data) && (
              <div className={styles.formElementWrapper}>
                <Typography sx={{ mb: 1 }}>
                  لطفا شبکه ارز خود را انتخاب کنید:
                </Typography>
                <FNetworkSelect
                  name="network"
                  options={values.coin!.networks}
                  onChange={handleNetworkSelect}
                />
              </div>
            )}
            <Alert severity="info" className={styles.formElementWrapper}>
              برای خرید ارز شما فقط مجاز به ثبت آدرس کیف پول خودتان هستید بیت
              برگ هیچگونه مسئولیتی در قبال سایر آدرس کیف پولها نظیر درگاه‌های
              پرداخت، فروشگاه های آنلاین و... بر عهده نمی گیرد.
            </Alert>
            <FTextField
              InputLabelProps={{
                shrink: true,
              }}
              name="address"
              label="آدرس ارزی"
              inputProps={{ className: "en" }}
            />
            {Boolean(values.network?.hasTag) && (
              <FTextField
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{ className: "en" }}
                name="tag"
                label="تگ یا ممو"
              />
            )}
            <FTextField
              InputLabelProps={{
                shrink: true,
              }}
              name="title"
              label="عنوان"
              helperText="جهت سهولت در انتخاب، می‌توانید آدرس خود را نامگذاری کنید."
            />
            <LoadingButton
              className={styles.button}
              loading={isSubmitting}
              variant="contained"
              fullWidth
              type="submit"
            >
              ثبت
            </LoadingButton>
          </Form>
        )}
      </Formik>
    </AppDialogComponent>
  );
}
