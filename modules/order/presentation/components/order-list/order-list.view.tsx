import {
  OrderInterface,
  OrderStatus,
} from "@/modules/order/domain/entities/order";
import { Typography } from "@mui/material";
import clsx from "clsx";
import OrderCardComponent from "../order-card";
import styles from "./order-list.module.scss";
import { useIsDesktopSize } from "@/core/hooks";
import InfiniteListComponent, {
  fixedRowBuilder,
} from "@/core/components/common/infinite-list";
import useOrders from "@/modules/order/domain/usecases/useOrders";
import LoadingComponent from "@/core/components/common/loading";
import { OrderType } from "@/core/enums/order.enums";
import EmptyContentComponent from "@/core/components/common/empty-content";

type PropTypes = {
  openOrderModal: (data: OrderInterface) => void;
  status: OrderStatus["id"][];
  type?: OrderType;
};
export default function OrderListView(props: PropTypes) {
  const { openOrderModal, status, type } = props;
  const isDesktopSize = useIsDesktopSize();
  return (
    <InfiniteListComponent
      {...{
        pageSize: 2,
        getHook: useOrders,
        params: { status: status.length ? status : undefined, type },
        getItemData: (rows) => ({ rows, openOrderModal }),
        itemSize: isDesktopSize ? 82 : 218,
        Row,
        revalidateOnMount: true,
      }}
    >
      {({ List, rows, isLoading, error }) => (
        <>
          <div className={clsx("desktop-up", styles.header, styles.row)}>
            <div>
              <Typography component="span">نوع</Typography>
            </div>
            <div>
              <Typography component="span">مقدار</Typography>
            </div>
            <div>
              <Typography component="span">ارزش</Typography>
            </div>
            <div>
              <Typography component="span">زمان</Typography>
            </div>
            <div>
              <Typography component="span">وضعیت</Typography>
            </div>
            <div>
              <Typography component="span">جزئیات</Typography>
            </div>
          </div>
          {!error && List}
          {Boolean(!rows.length && !isLoading) && (
            <EmptyContentComponent message="سفارشی یافت نشد." />
          )}
          <LoadingComponent loading={isLoading} />
        </>
      )}
    </InfiniteListComponent>
  );
}

const Row = fixedRowBuilder(({ index, style, data }) => {
  const { rows, openOrderModal } = data;
  return (
    <div style={style}>
      <OrderCardComponent
        data={rows[index]}
        onClick={() => openOrderModal(rows[index])}
      />
    </div>
  );
});
