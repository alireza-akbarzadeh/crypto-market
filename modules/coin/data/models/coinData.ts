import { CoinDataInterface } from "./../../domain/entities/coin";
import { currencyConverter } from "@/core/helpers";

const backupChart = Array(18)
  .fill("")
  .map(() => {
    return { value: Math.random() / 10 + 1 };
  });
export default function coinDataModelMapper(
  data: any,
  meta: any
): CoinDataInterface {
  const {
    id,
    chart,
    coin,
    enName,
    faName,
    icon,
    percent,
    price,
    quote,
    isFavorite,
    decimal,
  } = data;

  const min = Math.min(...chart);

  return {
    id,
    chart: chart.length
      ? chart.map((val: string) => ({
          value: +val - min,
        }))
      : backupChart,
    shortName: coin,
    faName,
    enName,
    price,
    marketCapacity: quote,
    sellPrice: currencyConverter(price, meta?.prices?.sell),
    buyPrice: currencyConverter(price, meta?.prices?.buy),
    usdSell: meta?.prices?.sell,
    usdBuy: meta?.prices?.buy,
    changes: percent,
    favorite: isFavorite,
    icon,
    decimal,
  };
}
