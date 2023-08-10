import { DefaultFetchConfig } from "@/core/constants/types";
import { useMemo } from "react";
import { useUserBankCardsDS } from "../../data/datasources/profile.datasource";
import bankCardModelMapper from "../../data/model/bankCard";

export default function useUserBankCards(
  accepted?: boolean,
  config?: DefaultFetchConfig
) {
  const { data, error, mutate, isValidating } = useUserBankCardsDS(
    accepted,
    config
  );

  const _data = useMemo(() => {
    return !data?.result?.items
      ? []
      : data.result.items.map(bankCardModelMapper);
  }, [data?.result?.items]);

  return {
    data: _data,
    loading: (!error && !data) || isValidating,
    error,
    mutate,
  };
}
