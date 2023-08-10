import AppDialogComponent from "@/core/components/common/app-dialog";
import { TetherIcon } from "@/core/components/common/custom-icon";
import LoadingButton from "@/core/components/common/loading-button";
import { FTextField } from "@/core/components/form/formik-elements";
import { PriceAlertItemPair } from "@/core/enums/notification.enums";
import { currencyFormat } from "@/core/helpers";
import { CoinDataInterface } from "@/modules/coin/domain/entities/coin";
import {
  Stack,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import clsx from "clsx";
import { Form, Formik } from "formik";
import styles from "./create-alert-dialog.module.scss";
import Image from "next/image";

type PropTypes = {
  selectedCoin?: CoinDataInterface;
  onClose: () => void;
  open: boolean;
  pair: PriceAlertItemPair;
  setPair: (pair: PriceAlertItemPair) => void;
  hiddenPair: boolean;
  toggleIsBuy: () => void;
  isBuy: boolean;
  onSubmit: (value: any) => void;
  schema: any;
  currentPrice: number;
};
export default function CreateAlertDialogView(props: PropTypes) {
  const {
    selectedCoin,
    onClose,
    open,
    pair,
    setPair,
    hiddenPair,
    toggleIsBuy,
    isBuy,
    onSubmit,
    schema,
    currentPrice,
  } = props;
  return (
    <AppDialogComponent
      open={open}
      onClose={onClose}
      mobileStyle={2}
      title="تنظیم هشدار"
      titleClassName={styles.dialogTitle}
      customHeaderContent={
        selectedCoin ? (
          <div className={styles.headerCustomContent}>
            <div className={styles.logo}>
              <Image width={32} height={32} src={selectedCoin.icon} />
            </div>
            <div>
              <Typography variant="h6" component="div" fontWeight={500}>
                {selectedCoin?.faName}
              </Typography>
              <Typography color="text.secondary" component="div">
                {selectedCoin?.shortName}
              </Typography>
            </div>
          </div>
        ) : undefined
      }
      className={styles.root}
      classes={{ paper: styles.paper }}
      headerClassName={styles.header}
    >
      <Formik
        initialValues={{ price: "" }}
        onSubmit={onSubmit}
        validationSchema={schema}
      >
        {({ values, isSubmitting }) => (
          <Form className={styles.form}>
            <div className={styles.top}>
              <ToggleButtonGroup
                className={clsx(styles.toggleGroup, hiddenPair && "hidden")}
                color="standard"
                fullWidth
                value={pair}
                exclusive
                onChange={(_, val) => setPair(val !== null ? val : pair)}
                size="small"
              >
                <ToggleButton
                  className={styles.btn}
                  value={PriceAlertItemPair.IRT}
                >
                  تومان
                </ToggleButton>
                <ToggleButton
                  className={styles.btn}
                  value={PriceAlertItemPair.USDT}
                >
                  تتر
                </ToggleButton>
              </ToggleButtonGroup>
              <Stack
                className={clsx(
                  pair === PriceAlertItemPair.USDT && "opacity-0"
                )}
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="center"
              >
                <Typography component="span">خرید</Typography>
                <Switch
                  className={styles.customSwitch}
                  disableRipple
                  onChange={toggleIsBuy}
                  checked={!isBuy}
                />
                <Typography component="span">فروش</Typography>
              </Stack>
            </div>
            <div className={styles.middle}>
              <Typography color="text.secondary">
                {values.price ? (
                  <>
                    قیمت{" "}
                    {+values.price < currentPrice ? (
                      <Typography component="span" color="error">
                        کمتر
                      </Typography>
                    ) : (
                      <Typography component="span" color="success.main">
                        بیشتر
                      </Typography>
                    )}{" "}
                    از این شد بهت خبر بدیم
                  </>
                ) : (
                  "قیمت هشدار را وارد کنید"
                )}
              </Typography>
              <FTextField
                className={styles.input}
                name="price"
                type="currency"
                placeholder={currentPrice ? currencyFormat(currentPrice) : ""}
                fast={false}
                inputProps={{
                  disableSuffix: true,
                  decimalScale:
                    pair === PriceAlertItemPair.USDT
                      ? 8
                      : currentPrice < 100
                      ? 4
                      : 0,
                }}
              />
            </div>
            <div className={styles.down}>
              <Typography className={styles.currentPrice}>
                <span className={styles.label}>
                  قیمت فعلی{" "}
                  {pair === PriceAlertItemPair.USDT
                    ? ""
                    : isBuy
                    ? "خرید"
                    : "فروش"}
                </span>
                {pair === PriceAlertItemPair.USDT ? (
                  <TetherIcon />
                ) : (
                  <span className={styles.currency}>تومان</span>
                )}
                <span>{currencyFormat(currentPrice)}</span>
              </Typography>
              <LoadingButton
                loading={isSubmitting}
                disabled={isSubmitting || !values.price}
                fullWidth
                variant="contained"
                type="submit"
              >
                ثبت هشدار
              </LoadingButton>
            </div>
          </Form>
        )}
      </Formik>
    </AppDialogComponent>
  );
}
