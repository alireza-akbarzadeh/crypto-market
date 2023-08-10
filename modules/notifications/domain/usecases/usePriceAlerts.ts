import { useMemo } from "react";
import { usePriceAlertsDS } from "../../data/datasources/notifications.datasource";
import priceAlertGroupModelMapper from "../../data/model/priceAlertGroup";
import { PriceAlertGroup } from "../entities/priceAlerts";

export default function usePriceAlerts() {
  const { data, error, isValidating, mutate } = usePriceAlertsDS();

  const _data: PriceAlertGroup[] = useMemo(() => {
    return (data?.result?.items || []).map(priceAlertGroupModelMapper);
  }, [data]);

  return {
    data: _data,
    error: data?.error || error,
    isValidating,
    mutate,
    isLoading: !data && !error,
  };
}
