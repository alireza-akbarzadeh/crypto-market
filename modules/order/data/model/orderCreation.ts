import { OrderCreationResponse } from "../../domain/entities/order";

export default function orderCreationModelMapper(
  data: any
): OrderCreationResponse | undefined {
  if (!data) return;
  const { orderStatus, alert } = data;
  return { status: orderStatus, alert };
}
