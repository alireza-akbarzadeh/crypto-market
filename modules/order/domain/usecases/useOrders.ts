import orderModelMapper from "@/modules/order/data/model/order";
import { GetPaginateHookType } from "./../../../../core/hooks/usePaginateHelpers";
import { OrderInterface } from "@/modules/order/domain/entities/order";
import { useOrdersDS } from "../../data/datasources/order.datasource";
import { OrderType } from "@/core/enums/order.enums";

const useOrders: GetPaginateHookType<OrderInterface> = ({
  status,
  type,
}: any) => {
  const { rows, meta, setSize, size, isLoading, mutate, error } =
    useOrdersDS<OrderInterface>(
      orderModelMapper,
      status,
      type === OrderType.Buy
        ? "buy"
        : type === OrderType.Sell
        ? "sell"
        : undefined
    );
  return {
    rows,
    meta,
    size,
    setSize,
    isLoading,
    mutate,
    error,
  };
};

export default useOrders;
