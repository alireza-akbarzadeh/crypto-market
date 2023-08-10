import { PriceAlertItem } from "../../domain/entities/priceAlerts";

export default function priceAlertModelMapper(data: any): PriceAlertItem {
  const { id, coin, price, up, side, pair, reached, currency } = data;

  return {
    id,
    shortName: coin,
    price: +price,
    up,
    side,
    pair,
    reached,
    // enName: currency.eng,
    // faName: currency.fa,
    // icon: currency.icon,
    // iconId: currency.coin_id,
  };
}
