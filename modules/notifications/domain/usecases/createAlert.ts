import { PriceAlertItemPair } from "@/core/enums/notification.enums";
import { createAlertDS } from "../../data/datasources/notifications.datasource";

type CreateAlertParams = {
  price: number;
  isBuy: boolean;
  pair: PriceAlertItemPair;
  coin: string;
  up: boolean;
};

export default async function createAlert({
  price,
  coin,
  isBuy,
  pair,
  up,
}: CreateAlertParams) {
  const { error, message, success } = await createAlertDS({
    price: +price,
    coin,
    up,
    pair,
    side: isBuy ? "buy" : "sell",
  });
  if (!success) return { error };
  return { data: message };
}
