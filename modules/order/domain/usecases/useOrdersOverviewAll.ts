import { DefaultFetchConfig } from "@/core/constants/types";
import { OrderDateSpan, OrderType } from "@/core/enums/order.enums";
import { useOrdersOverviewAllDS } from "../../data/datasources/order.datasource";
import { orderOverviewCurrencyModelMapper } from "../../data/model/ordersOverview";

function getType(type: OrderType) {
  switch (type) {
    case OrderType.Buy:
      return "buy";
    case OrderType.Sell:
      return "sell";
    default:
      return type;
  }
}
export default function useOrdersOverviewAll(
  type: OrderType,
  timespan: OrderDateSpan,
  config?: DefaultFetchConfig
) {
  const { data, error } = useOrdersOverviewAllDS(
    {
      type: getType(type),
      timespan,
    },
    config
  );

  // return { data: [] };
  return { data: data?.result?.items.map(orderOverviewCurrencyModelMapper) };
}
