import { useMemo } from "react";
import { useUpdatedCoinPriceDS } from "../../data/datasources/coin.datasource";

export default function useUpdatedCoinPrice(refreshInterval: number) {
  const {
    error,
    data: _data,
    isValidating,
    mutate,
  } = useUpdatedCoinPriceDS(refreshInterval);
  const data = useMemo(() => {
    if (!_data?.result) return;

    const res: any = {};
    _data.result.items.forEach((i: any) => {
      res[i.coin] = i.currencyPrice;
    });
    return res;
  }, [_data]);

  return { data, error, mutate, isValidating };
}
