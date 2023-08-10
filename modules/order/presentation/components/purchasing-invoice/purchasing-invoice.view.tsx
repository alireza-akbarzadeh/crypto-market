import sectionStyles from "../../utils/purchasing-steps.module.scss";
import styles from "./purchasing-invoice.module.scss";
import {
  Typography,
  List,
  ListItem,
  Button,
  Paper,
  Box,
  Stack,
  Skeleton,
} from "@mui/material";
import Image from "next/image";
import TimerIcon from "@mui/icons-material/Timer";
import { currencyFormat, parseString } from "@/core/helpers";
import { DoubleBackwardIcon } from "@/core/components/common/custom-icon";
import clsx from "clsx";
import { BuyOrderRequestData } from "@/modules/order/domain/entities/order";
import { WalletAddressInterface } from "@/modules/profile/domain/entities/wallet-address";

type PropTypes = {
  handlePrev: () => void;
  handleNext: () => void;
  isMobileSize: boolean;
  data?: BuyOrderRequestData;
  error: any;
  loading: boolean;
  address: WalletAddressInterface;
  initialData: BuyOrderRequestData;
};
export default function PurchasingInvoiceView(props: PropTypes) {
  const { handlePrev, handleNext, data, address, initialData } = props;
  return (
    <section className={styles.root}>
      <Typography
        component="h2"
        className={clsx(sectionStyles.stepTitle, "mobile-down")}
      >
        <span className={sectionStyles.stepPart}>گام سوم:</span> پیش فاکتور
      </Typography>
      <Paper className={sectionStyles.paper}>
        <Typography
          component="h2"
          className={clsx(sectionStyles.stepTitle, "mobile-up")}
        >
          <span className={sectionStyles.stepPart}>گام سوم:</span> پیش فاکتور
        </Typography>
        <Paper variant="outlined" className={styles.invoicePaper}>
          <div className={styles.invoiceHeader}>
            <Box
              className={styles.invoiceIcon}
              boxShadow={1}
              bgcolor="background.paper"
            >
              {data || initialData ? (
                <Image
                  src={(data || initialData).currency.icon}
                  alt={"ETH"}
                  width={40}
                  height={40}
                />
              ) : (
                <Skeleton variant="circular" width={40} height={40} />
              )}
            </Box>
          </div>
          <Typography component="h5" align="center" fontWeight={500}>
            {data || initialData ? (
              `دریافت ${(data || initialData).currency.faName}`
            ) : (
              <Skeleton width={100} sx={{ mx: "auto" }} />
            )}
          </Typography>
          <List className={styles.list}>
            <ListItem divider>
              <Typography component="span" color="text.secondary">
                قیمت جهانی:
              </Typography>
              <Typography component="span">
                {data ? (
                  <>
                    {currencyFormat(data.currencyPrice)}{" "}
                    <Typography component="span"> تتر</Typography>
                  </>
                ) : (
                  <Skeleton width={100} />
                )}
              </Typography>
            </ListItem>
            <ListItem divider>
              <Typography component="span" color="text.secondary">
                آدرس ارزی:
              </Typography>
              <Typography className="en" component="span">
                {parseString(address.address, 6, 15, "****")}
              </Typography>
            </ListItem>
            {Boolean(address.tag) && (
              <ListItem divider>
                <Typography component="span" color="text.secondary">
                  تگ یا ممو:
                </Typography>
                <Typography className="en" component="span">
                  {address.tag}
                </Typography>
              </ListItem>
            )}
          </List>
          <div className={styles.feeSection}>
            <Typography className={styles.title}>کارمزدها</Typography>
            <List className={styles.list}>
              <ListItem>
                <Typography component="span">مبلغ درخواستی:</Typography>
                <Typography component="span">
                  {data ? (
                    currencyFormat(data.price, "تومان")
                  ) : (
                    <Skeleton width={80} />
                  )}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography component="span">کارمزد شبکه:</Typography>
                <Typography component="span">
                  {/* {1} {"اتریوم"} معادل{" "} */}

                  {data ? (
                    currencyFormat(data.networkFeeIrt, "تومان")
                  ) : (
                    <Skeleton width={80} />
                  )}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography component="span">کارمزد تبدیل:</Typography>
                <Typography component="span">
                  {data ? (
                    currencyFormat(data.convertFee, "تومان")
                  ) : (
                    <Skeleton width={80} />
                  )}
                </Typography>
              </ListItem>
            </List>
          </div>
          <div className={clsx(styles.card, styles.amountSection)}>
            <Typography component="span" fontWeight={700}>
              مقدار تقریبی دریافتی:
            </Typography>
            <Typography component="span" fontWeight={700}>
              {data ? (
                <>
                  <Typography component="span" variant="h6" fontWeight={700}>
                    {currencyFormat(data.amount)}
                  </Typography>{" "}
                  {data.currency.faName}
                </>
              ) : (
                <Skeleton width={80} />
              )}
            </Typography>
          </div>
          <div className={clsx(styles.card, styles.valueSection)}>
            <Typography component="span" fontWeight={700}>
              مبلغ قابل پرداخت:
            </Typography>
            <Typography component="span" fontWeight={700}>
              {data ? (
                <>
                  <Typography component="span" variant="h6" fontWeight={700}>
                    {currencyFormat(data.totalPrice)}
                  </Typography>{" "}
                  تومان
                </>
              ) : (
                <Skeleton width={140} />
              )}
            </Typography>
          </div>
        </Paper>

        <Paper className={sectionStyles.footer}>
          <Button
            onClick={handlePrev}
            variant="outlined"
            startIcon={
              <DoubleBackwardIcon className={sectionStyles.buttonIcon} />
            }
          >
            مرحله قبل
          </Button>
          <Button onClick={handleNext} variant="contained" disabled={!data}>
            تایید و ثبت سفارش
          </Button>
        </Paper>
      </Paper>
    </section>
  );
}
