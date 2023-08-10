import { OrderType } from "@/core/enums/order.enums";
import { ColorVariant } from "@/core/enums/theme.enums";
import { OrderInterface } from "./../../domain/entities/order";
const TypeMap: any = {
  buy: OrderType.Buy,
  sell: OrderType.Sell,
};
const variantMap: any = {
  info: ColorVariant.Primary,
  danger: ColorVariant.Error,
  warning: ColorVariant.Warning,
  success: ColorVariant.Success,
};

export default function orderModelMapper(
  data: any
): OrderInterface | undefined {
  if (!data) return;
  const {
    id,
    currency,
    rialAccount,
    userWallet,

    amount,
    checkoutAt,
    createdAt,

    currencyPrice,
    flow,
    networkConfirmationAt,
    note,
    price,
    orderNumber,
    side,
    usdtPrice,
    status,
    txId,
    network,
    changeAddressPermission,
    checkoutType,
  } = data;
  return {
    id,
    currency: {
      id: currency?.id,
      shortName: currency?.coin,
      enName: currency?.enName,
      faName: currency?.faName,
      icon: currency?.icon,
    },
    type: TypeMap[side],
    status: { title: status.faTitle, variant: variantMap[status.variant] },
    amount: +amount,
    price: +price,
    orderNumber,
    currencyPrice: +currencyPrice,
    usdtPrice: +usdtPrice,
    checkoutAt,
    networkConfirmationAt,
    txId,
    note,
    createdAt: {
      date: createdAt.date,
      time: createdAt.time,
    },
    flow: flow.map(({ title, isComplete }: any) => ({ title, isComplete })),
    walletAddress: userWallet?.address,
    ibanNumber:
      TypeMap[side] === OrderType.Sell &&
      rialAccount?.number &&
      checkoutType.status === "instant"
        ? "IR" + rialAccount?.number
        : "",
    network: {
      id: network?.id,
      network: network?.network,
      name: network?.name,
      addressRegex: network?.addressRegex,
      tagRegex: network?.tagRegex,
      hasTag: network?.hasTag,
    },
    changeAddressPermission,
    checkoutType: checkoutType?.faTitle,
  };
}
