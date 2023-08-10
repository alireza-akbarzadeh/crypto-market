import { GetPaginateHookType } from "@/core/hooks/usePaginateHelpers";
import { useCoinNotificationsDS } from "../../data/datasources/notifications.datasource";
import priceAlertModelMapper from "../../data/model/priceAlert";
import { PriceAlertItem } from "../entities/priceAlerts";

const useCoinNotifications: GetPaginateHookType<PriceAlertItem> = (params) => {
  const { rows, meta, setSize, size, isLoading, isValidating, mutate } =
    useCoinNotificationsDS<PriceAlertItem>(priceAlertModelMapper, params);

  if (meta?.currency) {
    const { coinId, faName, enName, icon, symbol } = meta.currency;
    meta.currency = {
      shortName: symbol,
      icon,
      coinId,
      faName,
      enName,
    };
  }

  return {
    rows,
    meta,
    size,
    setSize,
    isLoading,
    mutate,
    isValidating,
  };
};
export default useCoinNotifications;
