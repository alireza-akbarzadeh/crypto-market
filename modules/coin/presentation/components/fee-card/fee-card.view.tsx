import { currencyFormat } from "@/core/helpers";
import { CoinFeeInterface } from "@/modules/coin/domain/entities/coin";
import { Typography, Skeleton } from "@mui/material";
import Image from "next/image";
import styles from "./fee-card.module.scss";
import { useMemo } from "react";
import clsx from "clsx";

type PropTypes = {
  data?: CoinFeeInterface;
};
export default function FeeCardView(props: PropTypes) {
  const { data } = props;

  const fakeNetworks = useMemo(() => {
    const count = Math.ceil(Math.random() * 4);
    return Array(count).fill("");
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.main}>
        <div className={styles.info}>
          <div className={styles.iconWrapper}>
            {data ? (
              <Image
                className={styles.icon}
                src={data.currency.icon}
                width={36}
                height={36}
              />
            ) : (
              <Skeleton variant="circular" width={36} height={36} />
            )}
          </div>
          <div>
            {data ? (
              <>
                <Typography className={styles.faName} component="div">
                  {data.currency.faName}
                </Typography>
                <Typography className={styles.enName} component="div">
                  {data.currency.enName}
                </Typography>
              </>
            ) : (
              <Skeleton width={60} />
            )}
            <Typography color="text.secondary" component="div">
              {data ? data.currency.shortName : <Skeleton width={30} />}
            </Typography>
          </div>
        </div>
        <div className={styles.sellFee}>
          <Typography component="span" className={styles.label}>
            {data ? "کارمزد فروش" : <Skeleton width={70} />}
          </Typography>
          {data ? (
            <Typography component="span" className={styles.value}>
              رایگان
            </Typography>
          ) : (
            <Skeleton variant="rectangular" className={styles.value}>
              <span className="opacity0">رایگان</span>
            </Skeleton>
          )}
        </div>
      </div>
      <div className={styles.values}>
        {data ? (
          <Typography component="div" className={styles.title}>
            کارمزد خرید
          </Typography>
        ) : (
          <Skeleton variant="rectangular" className={styles.title}>
            <span className="opacity0">کارمزد خرید</span>
          </Skeleton>
        )}
        <div className={styles.feeRow}>
          {(data?.fees || fakeNetworks).map((fee, index) => {
            if (fee && typeof fee.fee !== "number") return null;
            return (
              <div key={fee?.network || index} className={styles.feeItem}>
                <Typography className={styles.network} component="div">
                  {fee ? fee.network : <Skeleton width={40} />}
                </Typography>
                <div className={styles.value}>
                  <Typography className={styles.cur} component="span">
                    {fee ? "تومان" : <Skeleton width={20} />}
                  </Typography>
                  <Typography color="text.primary" component="span">
                    {fee ? currencyFormat(fee.fee) : <Skeleton width={60} />}
                  </Typography>
                </div>
                <div className={clsx(styles.coinValue)}>
                  <Typography component="span">
                    {fee ? (
                      currencyFormat(fee.coinFee)
                    ) : (
                      <Skeleton width={60} />
                    )}
                  </Typography>
                  <Typography className={styles.cur} component="span">
                    {fee ? data!.currency.shortName : <Skeleton width={20} />}
                  </Typography>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
