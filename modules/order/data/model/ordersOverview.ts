import { OrderOverviewResponse } from "../../domain/entities/order";

export function orderOverviewCurrencyModelMapper(data: any) {
  const { faName, enName, icon, color, symbol, ordersCount, totalPrice } = data;
  return {
    faName,
    enName,
    icon,
    color,
    shortName: symbol,
    ordersCount,
    totalPrice,
  };
}
function orderPieModelMapper(data: any) {
  const { faName, enName, icon, color, symbol, ordersCount, totalPrice } = data;
  return {
    faName,
    shortName: symbol,
    value: totalPrice,
    color,
    icon,
  };
}

export default function ordersOverviewModelMapper(
  data: any
): OrderOverviewResponse | undefined {
  if (!data) return;
  const {
    summary,
    count,
    totalPrice,
    currencies,
    othersCount,
    othersTotalPrice,
  } = data;
  return {
    summary: { count: summary.count, sum: summary.sum },
    count,
    totalPrice,
    othersCount,
    othersTotalPrice,
    currencies: currencies.map(orderOverviewCurrencyModelMapper),
    pie: currencies.map(orderPieModelMapper),
  };
}
