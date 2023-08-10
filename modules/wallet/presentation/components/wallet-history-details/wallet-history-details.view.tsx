import styles from "./wallet-history-details.module.scss";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Paper, Typography } from "@mui/material";
import MobileTrendingUpIcon from "@mui/icons-material/FileUploadTwoTone";
import MobileTrendingDownIcon from "@mui/icons-material/FileDownloadTwoTone";
import clsx from "clsx";
import { currencyFormat } from "@/core/helpers";
import moment from "moment-jalaali";
import { TransactionInterface } from "@/modules/wallet/domain/entities/transaction";
import {
  TransactionType,
  TransactionStatus,
} from "@/core/enums/transaction.enums";

const TypeMap: { [key in TransactionType]: string } = {
  [TransactionType.Deposit]: "افزایش موجودی",
  [TransactionType.Withdraw]: "برداشت وجه",
};

type PropTypes = {
  open: boolean;
  isDesktopSize: boolean;
  onClose: () => void;
  data?: TransactionInterface;
};
export default function WalletHistoryDetailsView(props: PropTypes) {
  const { open, onClose, isDesktopSize, data } = props;
  if (isDesktopSize) return null;
  return (
    <SwipeableDrawer
      // container={container}
      anchor="bottom"
      open={open}
      onClose={onClose}
      onOpen={() => {}}
      swipeAreaWidth={0}
      disableSwipeToOpen={false}
      ModalProps={{
        keepMounted: true,
      }}
      PaperProps={{ className: styles.paper }}
    >
      <div className={styles.handler} />
      {data ? (
        <>
          <div className={styles.header}>
            <div className={styles.iconWrapper}>
              {data.type === TransactionType.Deposit ? (
                <MobileTrendingUpIcon />
              ) : (
                <MobileTrendingDownIcon />
              )}
            </div>

            <Typography component="h3" className={styles.title}>
              {TypeMap[data.type]}
            </Typography>
            <Typography
              className={clsx(
                styles.value,
                data.type === TransactionType.Deposit ? styles.up : styles.down
              )}
            >
              {currencyFormat(data.value)}
              <span> تومان </span>
              {data.type === TransactionType.Deposit ? " +" : " -"}
            </Typography>
          </div>
          <div className={styles.list}>
            <div className={styles.listItem}>
              <Typography component="span" className={styles.label}>
                وضعیت تراکنش
              </Typography>
              <Typography
                component="span"
                className={clsx(styles.status, styles[data.variant])}
              >
                {data.statusTitle}
              </Typography>
            </div>
            <div className={styles.listItem}>
              <Typography component="span" className={styles.label}>
                زمان
              </Typography>
              <Typography component="span" className={styles.value}>
                <span>{data.createdAt.time}</span>
                <span className="bullet" />
                <span>{data.createdAt.date}</span>
              </Typography>
            </div>
            <div className={styles.listItem}>
              <Typography component="span" className={styles.label}>
                مانده پس از تراکنش
              </Typography>
              <Typography component="span" className={styles.value}>
                {currencyFormat(data.balance)}
              </Typography>
            </div>
            <div className={styles.listItem}>
              <Typography component="span" className={styles.label}>
                زمان واریز
              </Typography>
              <Typography component="span" className={styles.value}>
                {data.checkoutDate}
              </Typography>
            </div>
            <div className={styles.listItem}>
              <Typography component="span" className={styles.label}>
                شماره تراکنش
              </Typography>
              <Typography component="span" className={styles.value}>
                {data.transactionNumber}
              </Typography>
            </div>
            {Boolean(data.description) && (
              <div className={styles.listItem}>
                <Typography component="span" className={styles.label}>
                  توضیحات تراکنش
                </Typography>
                <Typography component="span" className={styles.value}>
                  {data.description}
                </Typography>
              </div>
            )}
          </div>
        </>
      ) : null}
    </SwipeableDrawer>
  );
}
