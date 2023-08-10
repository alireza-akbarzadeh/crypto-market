import { useWalletAddressFilterListDS } from "../../data/datasources/wallet.datasource";
import walletAddressModelMapper from "../../data/model/walletAddress";

export function useWalletAddressFilterList(
  currencyId?: string,
  networkId?: string
) {
  const { data, error, isValidating, mutate } = useWalletAddressFilterListDS(
    currencyId,
    networkId
  );
  return {
    error: data?.error || error,
    data: (data?.result?.items || []).map(walletAddressModelMapper),
    isValidating,
    mutate,
  };
}
