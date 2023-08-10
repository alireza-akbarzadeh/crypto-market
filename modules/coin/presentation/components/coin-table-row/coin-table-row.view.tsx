import { currencyFormat } from "@/core/helpers";
import { CoinDataInterface } from "@/modules/coin/domain/entities/coin";
import {
  Box,
  ButtonBase,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
import clsx from "clsx";
import ArrowUpIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDownIcon from "@mui/icons-material/ArrowDropDownRounded";
import styles from "./coin-table-row.module.scss";
import cellStyles from "../../utils/coin-table-cells.module.scss";
import CoinAreaChartComponent from "@/core/components/common/coin-area-chart";
import Image from "next/image";
import ArrowRightIcon from "@mui/icons-material/ArrowRightRounded";

import React from "react";
import {
  TetherIcon,
  StarIcon,
  StarOutlineIcon,
} from "@/core/components/common/custom-icon";

type PropTypes = {
  index: number;
  style: any;
  data?: CoinDataInterface;
  mode: string;
  isDesktopSize?: boolean;
  toggleStar: (e: any) => void;
  changeClass: string;
};
export default function CoinTableRowView(props: PropTypes) {
  const { data, index, style, mode, isDesktopSize, toggleStar, changeClass } =
    props;
  const href = data
    ? `/${data.enName.toLowerCase().replace(/\s/g, "-")}`
    : undefined;
  if (isDesktopSize) {
    return (
      <div style={style} className={clsx(styles.root, styles[changeClass])}>
        <ButtonBase component="a" href={href} className={styles.row}>
          <div className={clsx(styles.name, cellStyles.name)}>
            <div className={styles.imageWrapper}>
              {data ? (
                <Image
                  src={data.icon}
                  alt={data.enName}
                  width={40}
                  height={40}
                />
              ) : (
                <Skeleton variant="circular" width={36} height={36} />
              )}
            </div>
            <div className={styles.titleWrapper}>
              <Typography component="div" className={styles.title}>
                {data ? (
                  data.enName
                ) : (
                  // mode === "tether" ? (
                  //   data.enName
                  // ) : (
                  //   data.faName
                  // )
                  <Skeleton variant="text" width={100} />
                )}
              </Typography>
              <Typography
                className={styles.coinSubText}
                component="div"
                variant="caption"
                color="text.secondary"
              >
                {data ? (
                  <>
                    <Box
                      className={clsx(styles.coinIndex, "en")}
                      component="span"
                    >
                      {(index || 0) + 1}
                    </Box>{" "}
                    <span>{data.shortName}</span>
                  </>
                ) : (
                  <>
                    <Skeleton variant="text" width={12} />
                    <Skeleton variant="text" width={60} sx={{ mx: 0.5 }} />
                  </>
                )}
              </Typography>
            </div>
          </div>
          <div className={clsx(styles.price, cellStyles.buy)}>
            {data ? (
              mode === "toman" ? (
                <>
                  <Typography className={styles.value} component="span">
                    {currencyFormat(data.buyPrice, "", {
                      maximumFractionDigits: 5,
                    })}
                  </Typography>
                  <Typography className={styles.currency} component="span">
                    تومان
                  </Typography>
                </>
              ) : (
                <>
                  <TetherIcon fontSize="inherit" />
                  <Typography
                    className={clsx(styles.value, "en")}
                    component="span"
                    fontWeight={700}
                  >
                    {currencyFormat(data.price)}{" "}
                  </Typography>
                </>
              )
            ) : (
              <Skeleton variant="text" width={100} />
            )}
          </div>
          <div className={clsx(styles.price, cellStyles.sell)}>
            {data ? (
              mode === "toman" ? (
                <>
                  <Typography className={styles.value} component="span">
                    {currencyFormat(data.sellPrice, "", {
                      maximumFractionDigits: 5,
                    })}
                  </Typography>
                  <Typography className={styles.currency} component="span">
                    تومان
                  </Typography>
                </>
              ) : (
                <Typography
                  className={clsx(styles.value, "en", "ltr")}
                  component="span"
                >
                  {currencyFormat(data.marketCapacity, "", {
                    maximumFractionDigits: 2,
                  })}{" "}
                  USDT
                </Typography>
              )
            ) : (
              <Skeleton variant="text" width={100} />
            )}
          </div>
          <div className={clsx(styles.chart, cellStyles.chart)}>
            {data ? (
              <CoinAreaChartComponent
                data={data.chart}
                dataKey={"value"}
                color={data.changes < 0 ? "#EB4137" : "#30BE81"}
              />
            ) : (
              <Skeleton variant="rectangular" width="100%" height={40} />
            )}
          </div>
          <div className={clsx(styles.changes, cellStyles.changes)}>
            {data ? (
              <Changes
                className={clsx({
                  [styles.down]: data.changes < 0,
                  [styles.up]: data.changes > 0,
                })}
              >
                {data.changes}
              </Changes>
            ) : (
              <Skeleton variant="text" width={60} sx={{ mx: 0.5 }} />
            )}
          </div>
          <div className={clsx(styles.favorite, cellStyles.favorite)}>
            {data ? (
              <IconButton
                className={styles.favoriteButton}
                onClick={toggleStar}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
              >
                {data.favorite ? (
                  <StarIcon className={styles.favoriteIcon} />
                ) : (
                  <StarOutlineIcon className={styles.notFavoriteIcon} />
                )}
              </IconButton>
            ) : (
              <Skeleton
                component={StarIcon}
                className={styles.favoriteSkeleton}
              />
            )}
          </div>
        </ButtonBase>
      </div>
    );
  }
  return (
    <ButtonBase
      component="a"
      href={href}
      style={style}
      className={clsx(styles.mobileRoot, styles[changeClass])}
    >
      {mode === "tether" ? (
        <div className={styles.row}>
          <NameSection {...{ data, mode, index }} />
          <ChartSection {...{ data }} />
          <TetherPriceSection {...{ data }} />
          <FavoriteSection {...{ data, toggleStar }} />
        </div>
      ) : (
        <div className={styles.row}>
          <NameSection {...{ data, mode, index }} />
          <RialPriceSection {...{ data }} />
          <FavoriteSection {...{ data, toggleStar }} />
        </div>
      )}
    </ButtonBase>
  );
}
type SectionPropTypes = {
  data?: CoinDataInterface;
  mode?: string;
  index?: number;
  toggleStar?: any;
};
function NameSection({ data, mode, index }: SectionPropTypes) {
  return (
    <div className={styles.name}>
      <div className={styles.imageWrapper}>
        {data ? (
          <Image src={data.icon} alt={data.enName} width={40} height={40} />
        ) : (
          <Skeleton variant="circular" width={32} height={32} />
        )}
      </div>
      <div className={styles.titleWrapper}>
        <Typography component="div" className={styles.title}>
          {data ? (
            data.enName
          ) : (
            // mode === "tether" ? (
            //   data.enName
            // ) : (
            //   data.faName
            // )
            <Skeleton variant="text" width={100} />
          )}
        </Typography>
        <Typography
          className={styles.coinSubText}
          component="div"
          variant="caption"
          color="text.secondary"
        >
          {data ? (
            <>
              <Box
                className={clsx(styles.coinIndex, "en")}
                // className={clsx({
                //   [styles.coinIndex]: true,
                //   en: mode === "tether",
                // })}
                bgcolor="grey.300"
                component="span"
              >
                {(index || 0) + 1}
              </Box>{" "}
              {data.shortName} <Changes>{data.changes}</Changes>
            </>
          ) : (
            <>
              <Skeleton variant="text" width={12} />
              <Skeleton variant="text" width={60} sx={{ mx: 0.5 }} />
            </>
          )}
        </Typography>
      </div>
    </div>
  );
}
function RialPriceSection({ data }: SectionPropTypes) {
  return (
    <div className={styles.rialPrice}>
      <Typography component="div" variant="caption" color="text.secondary">
        {data ? (
          <>
            خرید:{" "}
            <Typography component="span" color="text.primary">
              {currencyFormat(data.buyPrice, "", { maximumFractionDigits: 0 })}
            </Typography>{" "}
            تومان
          </>
        ) : (
          <Skeleton variant="text" width={100} />
        )}
      </Typography>
      <Typography component="div" variant="caption" color="text.secondary">
        {data ? (
          <>
            فروش:{" "}
            <Typography component="span" color="text.primary">
              {currencyFormat(data.sellPrice, "", { maximumFractionDigits: 0 })}
            </Typography>{" "}
            تومان
          </>
        ) : (
          <Skeleton variant="text" width={120} />
        )}
      </Typography>
    </div>
  );
}
function ChartSection({ data, mode, index }: SectionPropTypes) {
  return (
    <div className={styles.chartContainer}>
      {data ? (
        <CoinAreaChartComponent
          data={data.chart}
          dataKey={"value"}
          color={data.changes < 0 ? "#EB4137" : "#30BE81"}
        />
      ) : (
        <Skeleton variant="rectangular" height={30} />
      )}
    </div>
  );
}
function TetherPriceSection({ data }: SectionPropTypes) {
  return (
    <div className={styles.worldPrice}>
      <Typography className="en nowrap" component="div" fontWeight="600">
        {data ? (
          <>
            {" "}
            {currencyFormat(data.price)} <TetherIcon fontSize="inherit" />
          </>
        ) : (
          <Skeleton variant="text" width={70} />
        )}
      </Typography>
      <Typography
        className="en nowrap"
        component="div"
        variant="caption"
        color="text.secondary"
      >
        {data ? (
          <>
            MCap{" "}
            {currencyFormat(data.marketCapacity / 1000000, "", {
              maximumFractionDigits: 2,
            })}
            M
          </>
        ) : (
          <Skeleton variant="text" width={80} />
        )}
      </Typography>
      {/* <Typography component="span" variant="caption" color="text.secondary">
          تتر
        </Typography> */}
    </div>
  );
}
function FavoriteSection({ data, toggleStar }: SectionPropTypes) {
  return (
    <div
      className={styles.star}
      onClick={toggleStar}
      onMouseDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
    >
      {data ? (
        <IconButton className={styles.favoriteButton}>
          {data.favorite ? (
            <StarIcon className={styles.favoriteIcon} />
          ) : (
            <StarOutlineIcon className={styles.notFavoriteIcon} />
          )}
        </IconButton>
      ) : (
        <Skeleton
          className={styles.favoriteButton}
          variant="rectangular"
          width={10}
          height={10}
        />
      )}
    </div>
  );
}

function Changes({ children, className }: any) {
  const props: any = {
    sx: { display: "inline-flex" },
    component: "span",
    variant: "caption",

    // className: styles.changesChip,
  };
  if (children === 0) {
    return (
      <Typography {...props}>
        <ArrowRightIcon /> {children}%
      </Typography>
    );
  }
  if (children >= 0) {
    return (
      <Typography {...props} color="success.main">
        <ArrowUpIcon />
        {children}%
      </Typography>
    );
  }
  return (
    <Typography color="error.main" {...props}>
      <ArrowDownIcon />
      {-children}%
    </Typography>
  );
}
