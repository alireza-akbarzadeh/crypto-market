import { UrlParams } from "./../../../../core/hooks/useInfiniteFetch";
import { GetPaginateHookType } from "./../../../../core/hooks/usePaginateHelpers";
import { WalletAddressCoinInterface } from "./../entities/coin";
import { useUpdateEffect } from "@/core/hooks";
import { useWalletAddressCoinsDS } from "../../data/datasources/wallet.datasource";
import { PaginateHelperType } from "@/core/constants/types";
import walletAddressCoinModelMapper from "../../data/model/walletAddressCoin";

const useWalletAddressCoins: GetPaginateHookType<WalletAddressCoinInterface> = (
  params?: UrlParams
) => {
  const { data, meta, error, isValidating, mutate, setSize, size, isLoading } =
    useWalletAddressCoinsDS(params);

  const rows: WalletAddressCoinInterface[] =
    data?.reduce((prev, next) => {
      const newData = next.result
        ? next.result.items.map(walletAddressCoinModelMapper)
        : [];
      return [...prev, ...newData];
    }, []) || [];

  return {
    rows,
    meta,
    size,
    setSize,
    isLoading,
    mutate,
  };
};
export default useWalletAddressCoins;
