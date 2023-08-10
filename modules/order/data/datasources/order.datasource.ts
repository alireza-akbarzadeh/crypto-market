import { useFetch, useInfiniteFetch } from "@/core/hooks";
import http from "@/core/http";
import { DefaultFetchConfig } from "@/core/constants/types";
import { OrderStatus } from "../../domain/entities/order";

type BuyOrderRequestParams = {
  currency: string;
  amount: number;
  price: number;
  network?: string;
};
export async function buyOrderRequestDS<T = any>(model: BuyOrderRequestParams) {
  return http.post<T>("/orderRequest/buy", model);
}
export function usePaymentOrderResultDS(id?: string) {
  return useFetch(id ? "/user/wallet/transactionInquiry?q=" + id : null, {
    revalidateOnFocus: false, //true
    // revalidateOnMount: false, //true
    // revalidateOnReconnect: false, //true
    // refreshWhenOffline: false, //false
    // refreshWhenHidden: false, //false
    // refreshInterval: 0, //disabled = 0
  });
}

export function usePurchaseStepsDS(id: string, config?: DefaultFetchConfig) {
  return useFetch(id ? "/orderRequest/buy/" + id : null, {
    revalidateOnFocus: false, //true
    revalidateOnMount: false, //true
    // revalidateOnReconnect: false, //true
    // refreshWhenOffline: false, //false
    // refreshWhenHidden: false, //false
    // refreshInterval: 0, //disabled = 0
    ...config,
  });
}

type SellOrderRequestParams = {
  currency: string;
  amount: number;
  price: number;
  network?: string;
};
export async function sellOrderRequestDS<T = any>(
  model: SellOrderRequestParams
) {
  return http.post<T>("/orderRequest/sell", model);
}

export function useOrdersDS<RT>(
  rowBuilder: any,
  statuses: OrderStatus["id"][],
  side?: "buy" | "sell"
) {
  return useInfiniteFetch<RT>(
    { url: "/orders", rowBuilder, params: { statuses, side } },
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

export function usePurchaseInvoiceDS(id: string, config?: DefaultFetchConfig) {
  return useFetch(id ? "/orderRequest/buy/" + id + "/factor" : null, {
    revalidateOnFocus: false, //true
    revalidateOnMount: false, //true
    // revalidateOnReconnect: false, //true
    // refreshWhenOffline: false, //false
    // refreshWhenHidden: false, //false
    refreshInterval: 60000, //disabled = 0
    ...config,
  });
}

export function useSellStepsDS(id: string, config?: DefaultFetchConfig) {
  return useFetch(id ? "/orderRequest/sell/" + id : null, {
    revalidateOnFocus: false, //true
    revalidateOnMount: false, //true
    // revalidateOnReconnect: false, //true
    // refreshWhenOffline: false, //false
    // refreshWhenHidden: false, //false
    // refreshInterval: 0, //disabled = 0
    ...config,
  });
}
export function useOrderCreationDS(id?: string, config?: DefaultFetchConfig) {
  return useFetch(id ? "/orderStatus/" + id : null, {
    // revalidateOnFocus: false, //true
    // revalidateOnMount: false, //true
    // revalidateOnReconnect: false, //true
    // refreshWhenOffline: false, //false
    // refreshWhenHidden: false, //false
    refreshInterval: 5000, //disabled = 0
    ...config,
  });
}
export function useOrderDetailsDS(id?: string, config?: DefaultFetchConfig) {
  return useFetch(id ? "/order/" + id : null, {
    revalidateOnFocus: false, //true
    revalidateOnMount: false, //true
    // revalidateOnReconnect: false, //true
    // refreshWhenOffline: false, //false
    // refreshWhenHidden: false, //false
    // refreshInterval: 5000, //disabled = 0
    ...config,
  });
}

type SellCheckoutTypeDSParams = {
  checkoutType: "wallet" | "iban";
  rial_account_id?: string;
};
export async function sellCheckoutTypeDS<T = any>(
  model: SellCheckoutTypeDSParams
) {
  return http.post<T>("/orderRequest/sell/checkoutType", model);
}
type SubmitSellDSParams = {
  rial_account_id?: string;
};
export async function submitSellDS<T = any>(
  id: string,
  model: SubmitSellDSParams
) {
  return http.post<T>(`/orderRequest/sell/${id}/submit`, model);
}
export async function purchasePaymentDS<T = any>(id: string) {
  return http.post<T>(`/orderRequest/buy/${id}/payment`);
}
type PurchaseSubmitParams = {
  track_id: string;
  rial_account_id?: string;
  user_wallet_id: string;
  code?: string;
  phone?: string;
};
export async function purchaseSubmitDS<T = any>(
  id: string,
  model: PurchaseSubmitParams
) {
  return http.post<T>(`/orderRequest/buy/${id}/submit`, model);
}

// export function usePurchasePaymentDS(id: string, config?: DefaultFetchConfig) {
//   return useFetch(id ? "/orderRequest/buy/" + id + "/payment" : null, {
//     revalidateOnFocus: false, //true
//     revalidateOnMount: false, //true
//     // revalidateOnReconnect: false, //true
//     // refreshWhenOffline: false, //false
//     // refreshWhenHidden: false, //false
//     // refreshInterval: 60000, //disabled = 0
//     ...config,
//   });
// }
type ChangeAddressWalletParams = {
  user_wallet_id: string;
};
export async function changeAddressWalletDS<T = any>(
  id: string,
  model: ChangeAddressWalletParams
) {
  return http.put<T>(`/order/changeAddressWallet/${id}`, model);
}

type OrdersOverviewParams = {
  type?: "buy" | "sell";
  timespan?: number;
};
export function useOrdersOverviewDS(
  params?: OrdersOverviewParams,
  config?: DefaultFetchConfig
) {
  return useFetch(
    {
      url: "/report/orderReport/getReport",
      params,
    },
    {
      revalidateOnFocus: false, //true
      // revalidateOnMount: false, //true
      // revalidateOnReconnect: false, //true
      // refreshWhenOffline: false, //false
      // refreshWhenHidden: false, //false
      // refreshInterval: 0, //disabled = 0
      ...config,
    }
  );
}
export function useOrdersOverviewAllDS(
  params?: OrdersOverviewParams,
  config?: DefaultFetchConfig
) {
  return useFetch(
    {
      url: "/report/orderReport/getCurrencies",
      params,
    },
    {
      revalidateOnFocus: false, //true
      revalidateOnMount: false, //true
      // revalidateOnReconnect: false, //true
      // refreshWhenOffline: false, //false
      // refreshWhenHidden: false, //false
      // refreshInterval: 0, //disabled = 0
      ...config,
    }
  );
}
