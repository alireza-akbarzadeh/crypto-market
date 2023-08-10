import { CoinDataInterface } from "../entities/coin";
import { useCoinPricesDS } from "../../data/datasources/coin.datasource";
import { PaginateHelperType } from "@/core/constants/types";
import coinDataModelMapper from "../../data/models/coinData";
import { InfiniteFetchConfig } from "@/core/hooks/useInfiniteFetch";
import { useEffect, useMemo } from "react";

export type CoinPricesMetaType = {
  paginateHelper: PaginateHelperType;
  prices: { buy: number; sell: number };
};

// export type CoinPricesResultType = {
//   rows: CoinDataInterface[];
//   meta?: CoinPricesMetaType;
//   size: number;
//   setSize: (size: number) => void;
//   isLoading: boolean;
//   mutate: () => void;
// };

export default function useCoinPrices(
  {
    searchText,
    favorite,
    sort,
  }: { searchText?: string; favorite?: boolean; sort?: string },
  config?: InfiniteFetchConfig
) {
  const { data, meta, mutate, setSize, size, isLoading, isValidating, error } =
    useCoinPricesDS(
      {
        q: searchText,
        favorite: favorite ? 1 : undefined,
        sort,
      },
      config
    );

  const rows: CoinDataInterface[] = useMemo(() => {
    if (!data?.length) return [];

    return data.reduce((prev, next) => {
      if (!next.result) return prev;

      const newData = next.result.items.map((data: any) =>
        coinDataModelMapper(data, meta)
      );
      return [...prev, ...newData];
    }, []);
  }, [data]);

  return {
    rows,
    meta,
    size,
    setSize,
    isLoading,
    mutate,
    isValidating,
    error,
  };
}
