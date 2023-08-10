import { PriceAlertGroup } from "../../domain/entities/priceAlerts";
import priceAlertModelMapper from "./priceAlert";

export default function priceAlertGroupModelMapper(data: any): PriceAlertGroup {
  const { hasMore, symbol, icon, coinId, faName, enName, alerts } = data;

  return {
    hasMore,
    shortName: symbol,
    icon,
    coinId: coinId,
    faName,
    enName,
    alerts: alerts.map(priceAlertModelMapper),
  };
}
