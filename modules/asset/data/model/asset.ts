import { AssetInterface } from "./../../domain/entities/asset";

export default function assetModelMapper(
  data: any
): AssetInterface | undefined {
  if (!data) return;
  const {
    id,
    currency,
    totalCost,
    totalAmount,
    currentAmount,
    profit,
    allowSideEdit,
  } = data;
  return {
    id,
    currency: {
      id: currency.id,
      shortName: currency.coin,
      faName: currency.faName,
      enName: currency.enName,
      icon: currency.icon,
    },
    totalCost,

    totalAmount,
    currentValue: +currentAmount,
    profit: {
      amount: profit.amount,
      percentage: profit.percentage,
    },
    allowSideEdit,
  };
}
