import styles from "./trade-modal.module.scss";
import AppDialogComponent from "@/core/components/common/app-dialog";
import LoadingButton from "@/core/components/common/loading-button";
import {
  FCoinAutoComplete,
  FTextField,
} from "@/core/components/form/formik-elements";
import {
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import Image from "next/image";
import {
  AssetInterface,
  CreateAssetFormValues,
  TradeInterface,
} from "@/modules/asset/domain/entities/asset";
import { TrashIcon } from "@/core/components/common/custom-icon";

type PropTypes = {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: CreateAssetFormValues) => void;
  schema: any;
  initialFormData: any;
  data?: TradeInterface;
  coin?: AssetInterface["currency"];
  handleDelete: (setSubmit: (val: boolean) => void) => void;
  changeCoin?: () => void;
  availableAsset: number;
  allowSideEdit?: boolean;
};

export default function TradeModalView(props: PropTypes) {
  const {
    open,
    onClose,
    onSubmit,
    schema,
    initialFormData,
    coin,
    data,
    handleDelete,
    changeCoin,
    availableAsset,
    allowSideEdit,
  } = props;
  return (
    <AppDialogComponent
      classes={{ paper: styles.paper }}
      contentClassName={styles.content}
      closeOnOutside={false}
      className={styles.root}
      open={open}
      onClose={onClose}
      title={data ? "ویرایش مبادله" : "افزودن مبادله جدید"}
      mobileStyle={2}
      headerClassName={styles.header}
    >
      <Formik
        onSubmit={onSubmit}
        initialValues={initialFormData}
        validationSchema={schema}
      >
        {({
          values,
          isSubmitting,
          resetForm,
          errors,
          validateForm,
          setFieldValue,
          setSubmitting,
        }) => (
          <Form className={styles.form}>
            {Boolean(coin) && (
              <div className={styles.coinCard}>
                <div className={styles.imageWrapper}>
                  <Image src={coin!.icon} width={32} height={32} />
                </div>
                <div className={styles.name}>
                  <Typography variant="h6" fontWeight={500}>
                    {coin!.faName}
                  </Typography>
                  <Typography color="text.secondary">
                    {coin!.shortName}
                  </Typography>
                </div>
                {changeCoin ? (
                  <Button
                    onClick={() => {
                      changeCoin();
                      resetForm();
                    }}
                  >
                    تغییر ارز
                  </Button>
                ) : null}
              </div>
            )}
            {availableAsset && (!data || allowSideEdit !== false) ? (
              <ToggleButtonGroup
                disabled={isSubmitting}
                color="standard"
                fullWidth
                value={values.isSell}
                exclusive
                onChange={(_, val) => {
                  if (val !== null) setFieldValue("isSell", val);
                }}
                size="small"
                className={styles.buttonGroup}
              >
                <ToggleButton value={false}>خرید</ToggleButton>
                <ToggleButton value={true}>فروش </ToggleButton>
              </ToggleButtonGroup>
            ) : null}

            <FTextField
              InputLabelProps={{
                shrink: true,
              }}
              className="text-center"
              name="amount"
              type="currency"
              inputProps={{
                tabIndex: values.isSell ? 2 : 1,
                disableSuffix: true,
                decimalScale: 10,
              }}
              label={values.isSell ? "مقدار ارز پرداختی" : "مقدار ارز دریافتی"}
              placeholder={
                values.isSell ? "مقدار ارز پرداختی" : "مقدار ارز دریافتی"
              }
              style={{ order: values.isSell ? 2 : 1 }}
              fast={false}
            />
            <FTextField
              InputLabelProps={{
                shrink: true,
              }}
              className="text-center"
              name="price"
              type="currency"
              label={values.isSell ? "مقدار وجه دریافتی" : "مقدار وجه پرداختی"}
              placeholder={
                values.isSell ? "مقدار وجه دریافتی" : "مقدار وجه پرداختی"
              }
              style={{ order: values.isSell ? 1 : 2 }}
              inputProps={{
                tabIndex: values.isSell ? 1 : 2,
              }}
              // tabIndex={values.isSell ? 2 : 1}
              fast={false}
            />
            <div className={styles.buttonWrapper}>
              {data ? (
                <div>
                  <LoadingButton
                    tabIndex={-1}
                    onClick={() => handleDelete(setSubmitting)}
                    color="error"
                    endIcon={<TrashIcon />}
                  >
                    حذف
                  </LoadingButton>
                </div>
              ) : null}
              <div>
                <LoadingButton
                  loading={isSubmitting}
                  variant="contained"
                  fullWidth
                  type="submit"
                  tabIndex={3}
                >
                  {data ? "ذخیره تغییرات" : "افزودن"}
                </LoadingButton>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </AppDialogComponent>
  );
}
