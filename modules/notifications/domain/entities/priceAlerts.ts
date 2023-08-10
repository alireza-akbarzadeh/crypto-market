import { PriceAlertItemPair } from "@/core/enums/notification.enums";

export interface PriceAlertItem {
  id: string;
  shortName: string;
  price: number;
  up: boolean;
  side: "buy" | "sell";
  pair: PriceAlertItemPair;
  reached: boolean;
  // enName: string;
  // faName: string;
  // icon: string;
  // iconId: string;
}
export interface PriceAlertGroup {
  hasMore: number;
  shortName: string;
  icon: string;
  coinId: number | string;
  faName: string;
  enName: string;
  alerts: PriceAlertItem[];
}
