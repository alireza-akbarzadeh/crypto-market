import styles from "./order-card.module.scss";
import tableStyles from "../order-list/order-list.module.scss";
import {
  Typography,
  ListItem,
  ListItemButton,
  Paper,
  Grid,
  Divider,
  Button,
  Skeleton,
} from "@mui/material";
import { currencyFormat } from "@/core/helpers";
import moment from "moment-jalaali";
import { OrderInterface } from "@/modules/order/domain/entities/order";
import { OrderType } from "@/core/enums/order.enums";
import Image from "next/image";
import clsx from "clsx";
import { ArrowBackIcon } from "@/core/components/common/custom-icon";
import ArrowLeftIcon from "@mui/icons-material/KeyboardBackspace";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeftRounded";
import IRR from "@/public/images/irr.png";
import { useIsDesktopSize } from "@/core/hooks";

const OrderTypeMap = {
  [OrderType.Buy]: "خرید",
  [OrderType.Sell]: "فروش",
};

type PropTypes = {
  data?: OrderInterface;
  onClick: () => void;
};
export default function OrderCardView(props: PropTypes) {
  const { onClick, data } = props;
  const isDesktopSize = useIsDesktopSize();

  const isBuy = data?.type === OrderType.Buy;
  // WARNING: When refactoring this, pay attention to support section as it uses mobile size anyway
  if (isDesktopSize) {
    return (
      <div className={clsx(tableStyles.row, styles.orderListItem)}>
        <div className={styles.type}>
          <Typography component="span">
            {data ? OrderTypeMap[data.type] : <Skeleton />}
          </Typography>
        </div>
        <div className={styles.amount}>
          <div className={styles.imageContainer}>
            {data ? (
              <Image
                src={data.currency.icon}
                alt={data.currency.enName}
                width={24}
                height={24}
              />
            ) : (
              <Skeleton variant="circular" width={24} height={24} />
            )}
          </div>
          {data ? (
            <>
              <Typography component="span" fontWeight={500}>
                {currencyFormat(data.amount)}
              </Typography>
              <Typography
                className={styles.label}
                color="text.secondary"
                component="span"
              >
                {data.currency.faName}
              </Typography>
            </>
          ) : (
            <Skeleton width={100} />
          )}
        </div>
        <div className={styles.value}>
          {data ? (
            <>
              <Typography component="span" fontWeight={500}>
                {currencyFormat(data.price)}{" "}
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
                component="span"
              >
                {"تومان"}
              </Typography>
            </>
          ) : (
            <Skeleton width={110} />
          )}
        </div>
        <div className={styles.date}>
          <Typography color="text.secondary" component="span">
            {data ? (
              <>
                <span>{data.createdAt.time}</span>
                <span className="bullet" />
                <span>{data.createdAt.date}</span>
              </>
            ) : (
              <Skeleton width={110} />
            )}
          </Typography>
        </div>
        <div className={styles.status}>
          {data ? (
            <Typography
              className={clsx("status-chip", data.status.variant)}
              component="span"
            >
              {data.status.title}
            </Typography>
          ) : (
            <Skeleton
              variant="rectangular"
              height={35}
              sx={{ borderRadius: 1.5 }}
            />
          )}
        </div>
        <div className={styles.details}>
          {data ? (
            <Button
              onClick={onClick}
              color="inherit"
              endIcon={<ArrowBackIcon className={styles.buttonArrow} />}
            >
              مشاهده
            </Button>
          ) : (
            <Skeleton
              variant="rectangular"
              height={35}
              sx={{ borderRadius: 1.5 }}
            />
          )}
        </div>
      </div>
    );
  }
  return (
    <ListItem component={Paper} className={styles.orderCard} disablePadding>
      <ListItemButton className={styles.orderCardButton} onClick={onClick}>
        <div className={styles.topContent}>
          <div className={styles.coin}>
            {data ? (
              <Image
                src={isBuy ? IRR : data.currency.icon}
                alt={isBuy ? "﷼" : data.currency.enName}
                width={26}
                height={26}
              />
            ) : (
              <Skeleton variant="circular" width={26} height={26} />
            )}
            <Typography className={styles.title}>
              {data ? isBuy ? "پرداخت" : "فروش" : <Skeleton width={60} />}
            </Typography>
            <Typography className={styles.value}>
              {data ? (
                <>
                  <span>
                    {currencyFormat(isBuy ? data.price : data.amount)}{" "}
                  </span>
                  {isBuy ? "تومان" : data.currency.shortName}
                </>
              ) : (
                <Skeleton width={100} />
              )}
            </Typography>
          </div>
          <ArrowLeftIcon className={styles.icon} />
          <div className={styles.coin}>
            {data ? (
              <Image
                src={!isBuy ? IRR : data.currency.icon}
                alt={!isBuy ? "﷼" : data.currency.enName}
                width={26}
                height={26}
              />
            ) : (
              <Skeleton variant="circular" width={26} height={26} />
            )}
            <Typography className={styles.title}>
              {data ? "دریافت" : <Skeleton width={60} />}
            </Typography>
            <Typography className={styles.value}>
              {data ? (
                <>
                  <span>
                    {currencyFormat(isBuy ? data.amount : data.price)}{" "}
                  </span>
                  {isBuy ? data.currency.shortName : "تومان"}
                </>
              ) : (
                <Skeleton width={100} />
              )}
            </Typography>
          </div>
        </div>
        <Divider className={styles.divider} />
        <div className={styles.bottomContent}>
          <div className={styles.info}>
            <Typography className={styles.label}>
              {data ? "زمان سفارش" : <Skeleton width={70} />}
            </Typography>
            <Typography className={styles.value}>
              {data ? (
                <>
                  <span>{data.createdAt.time}</span>
                  <span className="bullet" />
                  <span>{data.createdAt.date}</span>
                </>
              ) : (
                <Skeleton width={100} />
              )}
            </Typography>
          </div>
          <div className={styles.info}>
            <Typography className={styles.label}>
              {data ? "وضعیت" : <Skeleton width={70} />}
            </Typography>

            {data ? (
              <Typography
                component="span"
                className={clsx(
                  "status-chip",
                  data.status.variant,
                  styles.status
                )}
              >
                {data.status.title}
              </Typography>
            ) : (
              <Skeleton width={100} />
            )}
          </div>
          <ChevronLeftIcon className={styles.icon} />
        </div>
      </ListItemButton>
    </ListItem>
  );
}
