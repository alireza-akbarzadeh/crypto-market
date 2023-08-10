import { DefaultFetchConfig } from "@/core/constants/types";
import { useMemo } from "react";
import { useWalletDS } from "../../data/datasources/wallet.datasource";
import walletModelMapper from "../../data/model/wallet";

export default function useWallet(config?: DefaultFetchConfig) {
  const { data, error, mutate, isValidating } = useWalletDS(config);

  return {
    data: useMemo(() => {
      if (!data?.result) return {};
      return walletModelMapper(data.result);
    }, [data]),
    loading: !error && !data,
    error,
    mutate,
  };
}
