import styles from "./wallet-history-card.module.scss";
import {
  Paper,
  Typography,
  Box,
  Collapse,
  Stack,
  ButtonBase,
  Skeleton,
} from "@mui/material";
import { currencyFormat } from "@/core/helpers";
import moment from "moment-jalaali";
import { useState } from "react";
import {
  ArrowBottomIcon,
  WalletDepositIcon,
  WalletWithdrawIcon,
} from "@/core/components/common/custom-icon";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import clsx from "clsx";
import MobileTrendingUpIcon from "@mui/icons-material/FileUploadTwoTone";
import MobileTrendingDownIcon from "@mui/icons-material/FileDownloadTwoTone";
import { TransactionInterface } from "@/modules/wallet/domain/entities/transaction";
import {
  TransactionStatus,
  TransactionType,
} from "@/core/enums/transaction.enums";
import { ColorVariant } from "@/core/enums/theme.enums";

const TypeMap: { [key in TransactionType]: string } = {
  [TransactionType.Deposit]: "افزایش موجودی",
  [TransactionType.Withdraw]: "برداشت وجه",
};

type PropTypes = {
  onClick: () => void;
  data?: TransactionInterface;
  open: boolean;
  isDesktopSize: boolean;
  isFirst?: boolean;
};
export default function WalletHistoryCardView(props: PropTypes) {
  const { onClick, data, open, isDesktopSize, isFirst } = props;
  if (isDesktopSize) {
    return (
      <div
        className={styles.historyItem}
        onClick={onClick}
        // sx={{ borderColor: data.variant + ".light" }}
      >
        <div className={styles.historySummery}>
          <div
            className={styles.itemType}
            // color={data ? data.variant + ".main" : "action.disabledButton"}
          >
            {/* <Box
              bgcolor={data ? data.variant + ".main" : "action.disabledButton"}
              className={styles.border}
            /> */}
            {!data ? (
              <Skeleton variant="rectangular" width={22} height={22} />
            ) : (
              <div
                className={clsx(
                  styles.iconWrapper,
                  data.type === TransactionType.Deposit
                    ? styles.up
                    : styles.down
                )}
              >
                {data.type === TransactionType.Deposit ? (
                  <WalletDepositIcon />
                ) : (
                  <WalletWithdrawIcon />
                )}
              </div>
            )}
            {/* <Typography component="span">
              {data ? TypeMap[data.type] : <Skeleton width={80} />}
            </Typography> */}
          </div>
          <div className={styles.itemContent}>
            <div className={styles.itemSection}>
              <div className={styles.item}>
                <Typography fontWeight="500" component="span">
                  {data ? TypeMap[data.type] : <Skeleton width={60} />}
                </Typography>
                <Typography className={styles.date}>
                  {data ? (
                    <>
                      <span>{data.createdAt.time}</span>
                      <span className="bullet" />
                      <span>{data.createdAt.date}</span>
                    </>
                  ) : (
                    <Skeleton width={120} />
                  )}
                </Typography>
              </div>
              <div className={styles.item}>
                <Typography fontWeight="500" component="span" variant="body2">
                  {data ? "مبلغ" : <Skeleton width={40} />}
                </Typography>
                <div className={styles.divider} />
                <div>
                  {data ? (
                    <>
                      <Typography
                        fontWeight="500"
                        component="span"
                        variant="body2"
                        color={
                          data.type === TransactionType.Deposit
                            ? "success.main"
                            : undefined
                        }
                      >
                        {currencyFormat(data.value)}
                      </Typography>
                      <Typography
                        component="span"
                        variant="caption"
                        color={
                          data.type === TransactionType.Deposit
                            ? "success.main"
                            : "text.secondary"
                        }
                      >
                        {" "}
                        {"تومان"}
                      </Typography>
                    </>
                  ) : (
                    <Skeleton width={80} />
                  )}
                </div>
              </div>

              <div className={styles.item}>
                <Typography
                  component="span"
                  variant="body2"
                  color="text.secondary"
                >
                  {data ? "وضعیت" : <Skeleton width={80} />}
                </Typography>
                <div className={styles.divider} />

                <Typography
                  component="span"
                  color={data ? data.variant + ".main" : undefined}
                >
                  {data ? data.statusTitle : <Skeleton width={100} />}
                </Typography>
              </div>
              {/* <div className={styles.item}>
                <Typography
                  component="span"
                  variant="body2"
                  color="text.secondary"
                >
                  {data ? "زمان ثبت" : <Skeleton width={80} />}
                </Typography>
                <div className={styles.divider} />
                <Typography component="span" variant="body2">
                  {data ? (
                    <>
                      <span>{data.createdAt.time}</span>
                      <span>{data.createdAt.date}</span>
                    </>
                  ) : (
                    <Skeleton width={120} />
                  )}
                </Typography>
              </div> */}
            </div>
            {data ? (
              <Collapse className={styles.collapse} in={open}>
                <div className={styles.itemSection}>
                  <div className={styles.item}>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.secondary"
                    >
                      {data ? "شماره تراکنش" : <Skeleton width={80} />}
                    </Typography>
                    <div className={styles.divider} />
                    <Typography component="span" variant="body2">
                      {data ? data.transactionNumber : <Skeleton width={100} />}
                    </Typography>
                  </div>
                  <div className={styles.item}>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.secondary"
                    >
                      زمان واریز
                    </Typography>
                    <div className={styles.divider} />
                    {/* <Typography
                      className={styles.date}
                      component="span"
                      variant="body2"
                    >
                      <span>{data.createdAt.time}</span>
                      <span>{data.createdAt.date}</span>
                    </Typography> */}
                    <Typography component="span" variant="body2">
                      {data.checkoutDate}
                    </Typography>
                  </div>
                  <div className={styles.item}>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.secondary"
                    >
                      مانده پس از تراکنش
                    </Typography>
                    <div className={styles.divider} />
                    <Typography component="span" variant="body2">
                      {currencyFormat(data.balance, "تومان")}
                    </Typography>
                  </div>
                </div>
                <div className={styles.description}>
                  <Typography
                    component="div"
                    variant="body2"
                    color="text.secondary"
                  >
                    توضیحات تراکنش
                  </Typography>
                  <Typography
                    component="p"
                    variant="body2"
                    // color="text.secondary"
                  >
                    {data.description}
                  </Typography>
                </div>
              </Collapse>
            ) : null}
          </div>
        </div>

        {data ? (
          <Box
            className={clsx({
              [styles.collapseBtn]: true,
              [styles.open]: open,
            })}
          >
            <ArrowBottomIcon className={styles.collapseIcon} />
          </Box>
        ) : (
          <Skeleton className={styles.collapseBtn} variant="rectangular" />
        )}
      </div>
    );
  }
  return (
    <ButtonBase
      onClick={onClick}
      component="div"
      className={clsx({ [styles.mobileView]: true, [styles.isFirst]: isFirst })}
    >
      {data ? (
        <div
          className={clsx(
            styles.iconWrapper,
            data.type === TransactionType.Deposit ? styles.up : styles.down
          )}
        >
          {data.type === TransactionType.Deposit ? (
            <WalletDepositIcon />
          ) : (
            <WalletWithdrawIcon />
          )}
        </div>
      ) : (
        <Skeleton
          className={styles.iconWrapper}
          variant="rectangular"
          width={40}
          height={40}
        />
      )}
      <div className={styles.content}>
        <div className={styles.desc}>
          <Typography>
            {data ? TypeMap[data.type] : <Skeleton width={60} />}
          </Typography>
          <Typography className={styles.date}>
            {data ? (
              <>
                <span>{data.createdAt.time}</span>
                <span className="bullet" />
                <span>{data.createdAt.date}</span>
              </>
            ) : (
              <Skeleton width={120} />
            )}
          </Typography>
        </div>

        {data ? (
          <div className={styles.valueContainer}>
            <Typography
              className={clsx(
                styles.value,
                data.type === TransactionType.Deposit ? styles.up : styles.down
              )}
            >
              {currencyFormat(data.value)}
              <Typography component="span"> تومان </Typography>
              {data.type === TransactionType.Deposit ? " +" : " -"}
            </Typography>
            {data.variant !== ColorVariant.Success && (
              <Typography
                className={clsx(styles.status, styles[data.variant])}
                component="div"
              >
                {data.statusTitle}
              </Typography>
            )}
          </div>
        ) : (
          <Skeleton width={80} />
        )}
      </div>
    </ButtonBase>
  );
}
