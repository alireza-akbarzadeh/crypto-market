import styles from "./price-alert-list-item.module.scss";
import { Skeleton, IconButton, Switch, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  TrendDownIcon,
  TrendUpIcon,
} from "@/core/components/common/custom-icon";
import { PriceAlertItem } from "@/modules/notifications/domain/entities/priceAlerts";
import { currencyFormat } from "@/core/helpers";
import { TetherIcon } from "@/core/components/common/custom-icon";
import clsx from "clsx";

type PropTypes = {
  data?: PriceAlertItem;
  openDelete: () => void;
  toggleReached: (e: any) => void;
  tempReached?: boolean;
};
export default function PriceAlertListItemView(props: PropTypes) {
  const { data, openDelete, toggleReached, tempReached } = props;

  return (
    <div className={styles.root}>
      <div
        className={clsx(
          styles.iconWrapper,
          data ? (data.up ? styles.success : styles.error) : undefined
        )}
      >
        {!data ? (
          <Skeleton variant="circular" width={24} height={24} />
        ) : data.up ? (
          <TrendUpIcon />
        ) : (
          <TrendDownIcon />
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.price}>
          {data ? (
            <>
              <Typography component="span">
                {data.up ? "بالاتر" : "کمتر"} از
              </Typography>
              <Typography className={styles.value} component="span">
                <Typography component="span">
                  {currencyFormat(data.price)}
                </Typography>
                {data.pair === "IRT" ? "تومان" : <TetherIcon />}
              </Typography>
            </>
          ) : (
            <Skeleton width={160} />
          )}
        </div>

        {data ? (
          Boolean(data.side) && (
            <Typography component="div" color="text.secondary">
              برای {data!.side === "buy" ? "خرید" : "فروش"}
            </Typography>
          )
        ) : (
          <Skeleton width={55} />
        )}
      </div>
      <div className={styles.action}>
        {data ? (
          <>
            <Switch
              onChange={toggleReached}
              checked={tempReached ?? !data.reached}
              disabled={tempReached != null}
            />
            <IconButton aria-label="more" onClick={openDelete}>
              <MoreVertIcon />
            </IconButton>
          </>
        ) : (
          <>
            <Skeleton
              variant="rectangular"
              width={34}
              height={14}
              sx={{ mr: 2, borderRadius: 3 }}
            />
            <Skeleton variant="circular" width={32} height={32} />
          </>
        )}
      </div>
    </div>
  );
}
