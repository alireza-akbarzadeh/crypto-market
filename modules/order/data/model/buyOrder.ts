import { BuyOrderRequestData } from "./../../domain/entities/order";

export default function buyOrderModelMapper(
  data?: any
): BuyOrderRequestData | undefined {
  if (!data) return undefined;
  const {
    amount,
    checkoutTimes,
    convertFee,
    currency,
    description,
    gatewayFee,
    networkFee,
    networkFeeIrt,
    networks,
    price,
    currencyPrice,
    totalPrice,
    trackId,
    updateNeed,

    checkoutTime,
  } = data;
  return {
    amount,
    checkoutTime,
    currencyPrice: +currencyPrice,
    checkoutTimes: checkoutTimes
      ? {
          title: checkoutTimes.title,
          items: checkoutTimes.items.map(({ key, value }: any) => ({
            name: key,
            value,
          })),
        }
      : undefined,
    convertFee,
    description,
    gatewayFee,
    networkFee: +networkFee,
    networkFeeIrt,
    price,
    totalPrice,
    currency: {
      coin: currency.coin,
      faName: currency.faName,
      icon: currency.icon,
    },
    networks: (networks || []).map(
      ({ network, name, disable, description, buyNote, sellNote }: any) => ({
        network,
        name,
        disable,
        description,
        buyNote,
        sellNote,
      })
    ),
    trackId,
    updateNeed,
  };
}
