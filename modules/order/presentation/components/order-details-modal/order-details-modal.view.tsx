import styles from "./order-details-modal.module.scss";
import {
  Box,
  Typography,
  DialogContent,
  Paper,
  Card,
  CardHeader,
  List,
  ListItem,
  Button,
  Alert,
  IconButton,
} from "@mui/material";
import { currencyFormat, parseString, splitString } from "@/core/helpers";
import moment from "moment-jalaali";
import Stepper from "@/core/components/common/stepper";
import CustomDialogComponent from "@/core/components/common/custom-dialog";
import { OrderType } from "@/core/enums/order.enums";
import { OrderInterface } from "@/modules/order/domain/entities/order";
import { CopyIcon } from "@/core/components/common/custom-icon";
import { useCopyToClipboard } from "@/core/hooks";
import clsx from "clsx";
import Image from "next/image";

const stepperData = [
  { label: "درخواست خرید", value: "1", innerLabel: "1" },
  { label: "احراز هویت", value: "2", innerLabel: "2" },
  { label: "در صف ارسال ارز", value: "3", innerLabel: "3" },
  { label: "ارز واریز شد", value: "done", innerLabel: "4" },
];

type PropTypes = {
  open: boolean;
  onClose: () => void;
  data?: OrderInterface;
  openChangeWallet: () => void;
};
export default function OrderDetailsModalView(props: PropTypes) {
  const { open, onClose, data, openChangeWallet } = props;
  const copyToClipboard = useCopyToClipboard();
  const isBuy = data?.type === OrderType.Buy;

  return (
    <CustomDialogComponent
      className={styles.root}
      open={open}
      onClose={onClose}
    >
      {!!data && (
        <DialogContent className={styles.dialogContent} sx={{ pt: 0 }}>
          <Typography variant="h5" component="h2" fontWeight="500">
            جزییات سفارش <span>{isBuy ? "خرید" : "فروش"}</span>
          </Typography>
          {data.note ? (
            <Alert severity="info" sx={{ mt: 2, mb: { xs: 1, md: 3 } }}>
              {data.note}
            </Alert>
          ) : null}
          <div className={clsx(styles.statusCard, styles[data.status.variant])}>
            <div className={styles.side}>
              <Typography component="span" variant="body2" sx={{ mb: 0.5 }}>
                {isBuy ? "ارز" : "مبلغ"} دریافتی:
              </Typography>
              <div className={styles.value}>
                {isBuy && (
                  <Image src={data.currency.icon} width={24} height={24} />
                )}
                <Typography component="span" variant="h6" fontWeight={700}>
                  {currencyFormat(isBuy ? data.amount : data.price)}{" "}
                </Typography>
                <Typography component="span" color="text.secondary">
                  {isBuy ? data.currency.faName : "تومان"}
                </Typography>
              </div>
            </div>
            <div className={styles.main}>
              <Typography component="div">
                <span>شماره سفارش:</span> <span>{data.orderNumber}</span>
              </Typography>
              <Typography component="div">
                <span>وضعیت:</span> <span>{data.status.title}</span>
              </Typography>
              <Typography component="div">
                <span>{isBuy ? "مبلغ پرداختی" : "ارز ارسالی"}:</span>
                <span>
                  {!isBuy && (
                    <span className={styles.icon}>
                      <Image src={data.currency.icon} width={24} height={24} />
                    </span>
                  )}
                  {currencyFormat(
                    !isBuy ? data.amount : data.price,
                    !isBuy ? data.currency.faName : "تومان"
                  )}
                </span>
              </Typography>
            </div>
          </div>
          <Card
            variant="outlined"
            className={styles.card}
            sx={{
              mb: { xs: 1, md: 3 },
            }}
          >
            <CardHeader className={styles.cardHeader} title="اطلاعات سفارش" />
            <Box sx={{ px: 1 }}>
              <List className={styles.list} disablePadding>
                <ListItem>
                  <Typography color="text.secondary">
                    قیمت جهانی ارز:{" "}
                  </Typography>
                  <Typography>
                    {currencyFormat(data.currencyPrice, "تتر")}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography color="text.secondary">قیمت تتر: </Typography>
                  <Typography>
                    {currencyFormat(data.usdtPrice, "تومان")}
                  </Typography>
                </ListItem>

                {Boolean(data.walletAddress) && (
                  <ListItem>
                    <Typography color="text.secondary">
                      آدرس کیف پول:{" "}
                    </Typography>
                    <div className={styles.address}>
                      <Typography className="en text-align-right">
                        {parseString(
                          data.walletAddress as string,
                          6,
                          10,
                          "****"
                        )}
                      </Typography>
                      {data.changeAddressPermission && (
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={openChangeWallet}
                        >
                          تغییر کیف پول
                        </Button>
                      )}
                    </div>
                  </ListItem>
                )}
                {Boolean(data.ibanNumber) && (
                  <ListItem>
                    <Typography color="text.secondary">
                      شماره شبای بانکی:{" "}
                    </Typography>
                    <Typography>
                      {splitString(data.ibanNumber as string, 4, " ")}
                    </Typography>
                  </ListItem>
                )}
                {isBuy && (
                  <ListItem>
                    <Typography color="text.secondary">زمان واریز: </Typography>
                    <Typography>{data.checkoutAt}</Typography>
                  </ListItem>
                )}
                {Boolean(!isBuy && data.checkoutAt) && (
                  <ListItem>
                    <Typography color="text.secondary">زمان تسویه: </Typography>
                    <Typography
                      dangerouslySetInnerHTML={{ __html: data.checkoutAt }}
                    />
                  </ListItem>
                )}
                <ListItem>
                  <Typography color="text.secondary">
                    زمان ثبت سفارش:{" "}
                  </Typography>
                  <Typography>
                    {data.createdAt.time}
                    <span className="bullet" />
                    {data.createdAt.date}
                  </Typography>
                </ListItem>
                {Boolean(data.networkConfirmationAt && !isBuy) && (
                  <ListItem>
                    <Typography color="text.secondary">تایید شبکه: </Typography>
                    <Typography
                      dangerouslySetInnerHTML={{
                        __html: data.networkConfirmationAt,
                      }}
                    />
                  </ListItem>
                )}

                {isBuy && (
                  <ListItem>
                    <Typography color="text.secondary">
                      شناسه تراکنش (Txid):{" "}
                    </Typography>
                    <Typography className={styles.txId}>
                      {data.txId ? (
                        <>
                          <span className="en">{data.txId}</span>
                          <IconButton
                            onClick={() => copyToClipboard(data.txId)}
                            color="primary"
                          >
                            <CopyIcon />
                          </IconButton>
                        </>
                      ) : (
                        "-"
                      )}
                    </Typography>
                  </ListItem>
                )}
                {Boolean(data.checkoutType && !isBuy) && (
                  <ListItem>
                    <Typography color="text.secondary">روش تسویه: </Typography>
                    <Typography>{data.checkoutType}</Typography>
                  </ListItem>
                )}
              </List>
            </Box>
          </Card>
          <Card variant="outlined" className={styles.card}>
            <CardHeader className={styles.cardHeader} title="فرایند سفارش" />
            <Box sx={{ px: 1 }}>
              <Stepper
                data={data.flow}
                current={data.flow.findIndex((f) => !f.isComplete)}
                valueSelector={(_, idx) => idx + 1}
                labelSelector={(data) => data.title}
                innerLabelSelector={(_, idx) => `${idx + 1}`}
              />
            </Box>
          </Card>
        </DialogContent>
      )}
    </CustomDialogComponent>
  );
}
