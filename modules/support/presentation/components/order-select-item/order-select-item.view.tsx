import styles from "./order-select-item.module.scss";
import { SimpleOrderInterface } from "@/modules/support/domain/entities/order";
import { ButtonBase, Paper, Skeleton, Typography } from "@mui/material";
import { currencyFormat } from "@/core/helpers";

type PropTypes = {
  data?: SimpleOrderInterface;
  onClick: () => void;
};
export default function OrderSelectItemView(props: PropTypes) {
  const { data, onClick } = props;
  return (
    <ButtonBase
      onClick={onClick}
      disableRipple={!data}
      className={styles.card}
      component="div"
    >
      <div className={styles.buttonInner}>
        <div className={styles.content}>
          <Typography
            fontWeight={700}
            component="div"
            style={{ color: data?.color }}
          >
            {data ? data.title : <Skeleton width={100} />}
          </Typography>
          <Typography component="div">
            {data ? (
              <>
                مبلغ واریزی شما:{" "}
                <span className={styles.amount}>
                  {currencyFormat(data.amount)}
                </span>{" "}
                {data.unit}
              </>
            ) : (
              <Skeleton width={180} />
            )}
          </Typography>
          <Typography component="div">
            {data ? data.createdAt : <Skeleton width={150} />}
          </Typography>
        </div>
        <div className={styles.orderNumber}>
          {data ? (
            <>
              <Typography
                component="div"
                variant="body2"
                color="text.secondary"
              >
                شماره سفارش
              </Typography>
              <Typography component="div" variant="h6" fontWeight={500}>
                {data.orderNumber}
              </Typography>
            </>
          ) : (
            <>
              <Skeleton width={"4.3rem"} />
              <Skeleton width={60} />
            </>
          )}
        </div>
      </div>
    </ButtonBase>
  );
}
