import styles from "./trade-item.module.scss";
import { Button, Skeleton, Typography } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownwardRounded";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowUpIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDownIcon from "@mui/icons-material/ArrowDropDownRounded";
import EditIcon from "@mui/icons-material/EditOutlined";
import { currencyFormat } from "@/core/helpers";
import { TradeInterface } from "@/modules/asset/domain/entities/asset";
import clsx from "clsx";

type PropTypes = {
  data?: TradeInterface;
  onEdit: () => void;
};
export default function TradeItemView(props: PropTypes) {
  const { data, onEdit } = props;

  const isProfit = (data?.profit.amount as any) > 0;
  const isLoss = (data?.profit.amount as any) < 0;
  return (
    <div className={styles.root}>
      <div className={styles.cell}>
        {data ? (
          <div className={styles.iconWrapper}>
            {data.isSell ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
          </div>
        ) : (
          <Skeleton variant="circular" className={styles.iconWrapper} />
        )}
        <Typography>
          {data ? data.isSell ? "فروش" : "خرید" : <Skeleton width={60} />}
        </Typography>
      </div>
      <div className={styles.cell}>
        <Typography className={styles.amount}>
          {data ? (
            <>
              {currencyFormat(Math.abs(data.totalAmount))}{" "}
              <span>{data.currency.faName}</span>
            </>
          ) : (
            <Skeleton />
          )}
        </Typography>
      </div>
      <div className={styles.cell}>
        <Typography className="desktop-down">
          {data ? "ارزش به تومان" : <Skeleton />}
        </Typography>
        <Typography className={styles.amount}>
          {data ? (
            <>
              {currencyFormat(Math.abs(data.currentValue))} <span>تومان</span>
            </>
          ) : (
            <Skeleton />
          )}
        </Typography>
      </div>
      <div className={styles.cell}>
        <Typography
          component="span"
          className={clsx(
            "desktop-down",
            "status-chip",
            isLoss ? "error" : "success"
          )}
        >
          {data ? (
            isProfit ? (
              "سود"
            ) : isLoss ? (
              "ضرر"
            ) : (
              "سود و ضرر"
            )
          ) : (
            <Skeleton />
          )}
        </Typography>
        {data ? (
          <div
            className={clsx({
              [styles.changes]: true,
              [styles.profit]: data.profit.amount > 0,
              [styles.loss]: data.profit.amount < 0,
            })}
          >
            <>
              <Typography className={styles.amount} component="span">
                ٪ {Math.abs(data.profit.percentage)}
              </Typography>
              {/* {data.profit.amount > 0 && (
                <ArrowUpIcon className={styles.icon} />
              )}
              {data.profit.amount < 0 && (
                <ArrowDownIcon className={styles.icon} />
              )} */}
              <Typography component="span">|</Typography>
              <Typography className={styles.amount} component="span">
                {currencyFormat(Math.abs(data.profit.amount))}
              </Typography>
              <Typography variant="body2" component="span">
                تومان
              </Typography>
            </>
          </div>
        ) : (
          <Skeleton width={150} />
        )}
      </div>
      <div className={styles.cell}>
        {data ? (
          <Button onClick={onEdit} endIcon={<EditIcon />}>
            ویرایش
          </Button>
        ) : (
          <Skeleton width={90} />
        )}
      </div>
    </div>
  );
}
