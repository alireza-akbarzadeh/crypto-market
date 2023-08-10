import { OrderType } from "./../../../../core/enums/order.enums";
import { SimpleOrderInterface } from "./../../domain/entities/order";

function sideMapper(side: "buy" | "sell") {
  if (side === "buy") return OrderType.Buy;
  return OrderType.Sell;
}

export default function simpleOrderModelMapper(
  data: any
): SimpleOrderInterface {
  const { id, side, amount, unit, color, orderNumber, createdAt, title } = data;
  return {
    id: `${id}`,
    side: sideMapper(side),
    amount: +amount,
    unit,
    color,
    orderNumber,
    createdAt,
    title,
  };
}
