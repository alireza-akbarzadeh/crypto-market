import { OrderDateSpan, OrderType } from "@/core/enums/order.enums";
import { useOrdersOverviewDS } from "../../data/datasources/order.datasource";
import ordersOverviewModelMapper from "../../data/model/ordersOverview";

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
export default function useOrdersOverview(
  type: OrderType,
  timespan: OrderDateSpan
) {
  const req = useOrdersOverviewDS({
    type: getType(type),
    timespan,
  });
  const { data, error } = req;

  return {
    data: ordersOverviewModelMapper(data?.result),
    coinsFallback: { ...req, data: data?.currencies },
  };
}
