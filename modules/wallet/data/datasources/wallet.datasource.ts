import { UrlParams } from "./../../../../core/hooks/useInfiniteFetch";
import { useFetch, useInfiniteFetch, usePaginateFetch } from "@/core/hooks";
import http from "@/core/http";
import { DefaultFetchConfig } from "@/core/constants/types";

export function useWalletAddressCoinsDS(params?: UrlParams) {
  return useInfiniteFetch(
    { url: "/user/walletAddress/getCoins", params },
    {
      revalidateOnFocus: false, //true
      revalidateFirstPage: false,
      revalidateOnMount: false, //true
      // revalidateOnReconnect: false, //true
      // refreshWhenOffline: false, //false
      // refreshWhenHidden: false, //false
      // refreshInterval: 0, //disabled = 0
    }
  );
}
type createWalletAddressParams = {
  currency_id: string;
  network_id: string;
  address: string;
  tag?: string;
  name?: string;
};
export function createWalletAddressDS<T = any>(
  model: createWalletAddressParams
) {
  return http.post<T>("/user/walletAddress", model);
}
export function deleteWalletAddressDS<T = any>(id: string) {
  return http.delete<T>("/user/walletAddress/" + id);
}

export function useWalletAddressListDS<RT>(rowBuilder: (init: any) => RT) {
  return useInfiniteFetch<RT>(
    { url: "/user/walletAddress", rowBuilder },
    {
      revalidateOnFocus: false, //true
      // revalidateFirstPage: false,
      // revalidateOnMount: false, //true
      // revalidateOnReconnect: false, //true
      // refreshWhenOffline: false, //false
      // refreshWhenHidden: false, //false
      // refreshInterval: 0, //disabled = 0
    }
  );
}
export function useWalletAddressFilterListDS(
  currencyId?: string,
  networkId?: string
) {
  return useFetch(
    networkId && currencyId
      ? `/user/walletAddress?networkId=${networkId}&currencyId=${currencyId}`
      : null,
    {
      revalidateOnFocus: false, //true
      // revalidateFirstPage: false,
      // revalidateOnMount: false, //true
      // revalidateOnReconnect: false, //true
      // refreshWhenOffline: false, //false
      // refreshWhenHidden: false, //false
      // refreshInterval: 0, //disabled = 0
    }
  );
}
export function useWalletDS(config?: DefaultFetchConfig) {
  return useFetch("/user/wallet", {
    revalidateOnFocus: false, //true
    // revalidateOnMount: false, //true
    // revalidateOnReconnect: false, //true
    // refreshWhenOffline: false, //false
    // refreshWhenHidden: false, //false
    // refreshInterval: 0, //disabled = 0
    ...config,
  });
}

type WalletWithdrawParams = {
  rial_account_id: string;
  amount: number;
};
export function withdrawRequestDS(model: WalletWithdrawParams) {
  return http.post("/user/wallet/withdrawRequest", model);
}
type WalletWithdrawApplyParams = {
  code: string;
  track_id: string;
};
export function withdrawApplyDS(model: WalletWithdrawApplyParams) {
  return http.post("/user/wallet/withdrawApply", model);
}

type WalletDepositParams = {
  rial_account_id: string;
  amount: number;
};
export function depositRequestDS(model: WalletDepositParams) {
  return http.post("/user/wallet/depositRequest", model);
}

export function useTransactionsPaginateDS<RT>(
  rowBuilder: (init: any) => RT,
  pageSize: number
) {
  return usePaginateFetch<RT>(
    { url: "/user/wallet/transactions", rowBuilder, params: { pageSize } },
    {
      revalidateOnFocus: false, //true
      // revalidateOnMount: false, //true
      // revalidateOnReconnect: false, //true
      // refreshWhenOffline: false, //false
      // refreshWhenHidden: false, //false
      // refreshInterval: 0, //disabled = 0
    }
  );
}
export function useTransactionsDS<RT>(rowBuilder: any) {
  return useInfiniteFetch<RT>(
    { url: "/user/wallet/transactions", rowBuilder },
    {
      revalidateOnFocus: false, //true
      revalidateFirstPage: false,
      // revalidateOnMount: false, //true
      // revalidateOnReconnect: false, //true
      // refreshWhenOffline: false, //false
      // refreshWhenHidden: false, //false
      // refreshInterval: 0, //disabled = 0
    }
  );
}
