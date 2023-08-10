import { OrderRequestInterface } from "@/modules/order/domain/entities/form-values";
import { sellOrderRequestDS } from "../../data/datasources/order.datasource";
import buyOrderModelMapper from "../../data/model/buyOrder";

export default async function sellOrderRequest(model: OrderRequestInterface) {
  const { success, result, error } = await sellOrderRequestDS({
    currency: model.coin,
    amount: model.amount,
    price: model.price,
    network: model.network,
  });

  if (!success) return { error };

  // const {
  //   amount,
  //   checkoutTimes,
  //   convertFee,
  //   currency,
  //   description,
  //   gatewayFee,
  //   networkFee,
  //   networkFeeIrt,
  //   networks,
  //   name,
  //   network,
  //   price,
  //   totalPrice,
  //   trackId,
  //   updateNeed,
  // } = result;
  // const data = {
  //   amount,
  //   checkoutTimes,
  //   convertFee,
  //   description,
  //   gatewayFee,
  //   networkFee,
  //   networkFeeIrt,
  //   name,
  //   network,
  //   price,
  //   totalPrice,
  //   currency: {
  //     coin: currency.coin,
  //     faName: currency.faName,
  //     icon: currency.icon,
  //   },
  //   networks: (networks || []).map(
  //     ({ network, name, disable, description }: any) => ({
  //       network,
  //       name,
  //       disable,
  //       description,
  //     })
  //   ),
  //   trackId,
  //   updateNeed,
  // };

  return {
    data: buyOrderModelMapper(result),
    error,
  };
}
