import { OrderRequestInterface } from "@/modules/order/domain/entities/form-values";
import { buyOrderRequestDS } from "../../data/datasources/order.datasource";
import buyOrderModelMapper from "../../data/model/buyOrder";

export default async function buyOrderRequest(model: OrderRequestInterface) {
  const { success, result, error } = await buyOrderRequestDS({
    currency: model.coin,
    amount: model.amount,
    price: model.price,
    network: model.network,
  });

  if (!success) return { error };

  return {
    data: buyOrderModelMapper(result),
    error,
  };
}
