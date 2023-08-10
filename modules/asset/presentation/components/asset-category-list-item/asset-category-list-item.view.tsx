import styles from "./asset-category-list-item.module.scss";
import { Typography, Button, Skeleton } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { currencyFormat } from "@/core/helpers";
import clsx from "clsx";
import ArrowUpIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDownIcon from "@mui/icons-material/ArrowDropDownRounded";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeftRounded";
import AssetCategoryListItemComponent from "../asset-category-list-item";
import { AssetInterface } from "@/modules/asset/domain/entities/asset";

type PropTypes = {
  data?: AssetInterface;
  isFirst: boolean;
};
export default function AssetCategoryListItemView(props: PropTypes) {
  const { data, isFirst } = props;

  const isProfit = (data?.profit.amount as any) > 0;
  const isLoss = (data?.profit.amount as any) < 0;

  return (
    <div
      className={clsx({
        [styles.item]: true,
        [styles.profit]: isProfit,
        [styles.loss]: isLoss,
        [styles.first]: isFirst,
      })}
    >
      <div className={clsx(styles.cell, styles.name)}>
        <div className={styles.imageWrapper}>
          {data ? (
            <Image src={data.currency.icon} width={40} height={40} />
          ) : (
            <Skeleton variant="circular" width={40} height={40} />
          )}
        </div>
        <div className={styles.names}>
          <Typography fontWeight={500} component="div">
            {data ? data.currency.faName : <Skeleton width={60} />}
          </Typography>
          <Typography color="text.secondary" component="div">
            {data ? data.currency.shortName : <Skeleton width={35} />}
          </Typography>
        </div>
      </div>
      <div className={clsx(styles.cell, styles.amount)}>
        <div>
          {data ? (
            <>
              <Typography component="span">
                {currencyFormat(data.totalAmount)}
              </Typography>{" "}
              <Typography color="text.secondary" component="span">
                واحد
                {/* {data.currency.faName} */}
              </Typography>
            </>
          ) : (
            <Skeleton width={60} />
          )}
        </div>
        <div className="desktop-down">
          {data ? (
            <>
              <Typography component="span">
                {currencyFormat(data.currentValue)}
              </Typography>{" "}
              <Typography color="text.secondary" component="span">
                تومان
              </Typography>
            </>
          ) : (
            <Skeleton width={60} />
          )}
        </div>
      </div>
      <div className={clsx(styles.cell, styles.amount)}>
        <div className="desktop-up">
          {data ? (
            <>
              <Typography component="span">
                {currencyFormat(data.currentValue)}
              </Typography>{" "}
              <Typography color="text.secondary" component="span">
                تومان
              </Typography>
            </>
          ) : (
            <Skeleton width={60} />
          )}
        </div>
        <div className="desktop-down">
          {data ? (
            <Typography
              className={clsx("status-chip", isLoss ? "error" : "success")}
              component="span"
            >
              {isProfit ? "سود" : isLoss ? "ضرر" : "سود و ضرر"}
            </Typography>
          ) : (
            <Skeleton width={120} />
          )}
        </div>
      </div>
      <div className={clsx(styles.cell, styles.value)}>
        <div className={styles.changes}>
          {data ? (
            <>
              {" "}
              <Typography className={styles.amount} component="span">
                ٪ {Math.abs(data.profit.percentage)}
              </Typography>
              {/* {isProfit && <ArrowUpIcon className={styles.icon} />}
              {isLoss && <ArrowUpIcon className={styles.icon} />} */}
              <Typography component="span">|</Typography>
              <Typography className={styles.amount} component="span">
                {currencyFormat(Math.abs(data.profit.amount))}
              </Typography>
              <Typography variant="body2" component="span">
                تومان
              </Typography>
            </>
          ) : (
            <Skeleton width={120} />
          )}
        </div>
      </div>
      <div className={clsx(styles.cell, styles.value)}>
        {data ? (
          <Link href={"/portfolio/" + data.id}>
            <Button component="a" endIcon={<ChevronLeftIcon />}>
              <span>
                مشاهده<span className="desktop-down"> جزئیات</span>
              </span>
            </Button>
          </Link>
        ) : (
          <Skeleton sx={{ m: "auto" }}>
            <Button
              className="opacity0"
              component="a"
              endIcon={<ChevronLeftIcon />}
            >
              <span>
                مشاهده<span className="desktop-down"> جزئیات</span>
              </span>
            </Button>
          </Skeleton>
        )}
      </div>
    </div>
  );
}
