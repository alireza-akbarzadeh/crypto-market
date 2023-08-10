import { useFetch, useInfiniteFetch } from "@/core/hooks";
import { InfiniteFetchConfig } from "@/core/hooks/useInfiniteFetch";
import http from "@/core/http";

export function getCoinPricesDS(params: any) {
  return http.get("/currencies", { params });
}

export function useCoinPricesDS(params: any, config?: InfiniteFetchConfig) {
  return useInfiniteFetch(
    { url: "/currencies", params },
    {
      revalidateOnFocus: false, //true
      revalidateFirstPage: false,
      revalidateOnMount: false, //true
      // revalidateOnReconnect: false, //true
      // refreshWhenOffline: false, //false
      // refreshWhenHidden: false, //false
      // refreshInterval: 0, //disabled = 0
      ...config,
    }
  );
}
export function getCoinPriceDS(params: any) {
  return http.get("/currencies", { params });
}
export function useFeesDS<RT>(rowBuilder: (data: any) => RT, params: any) {
  return useInfiniteFetch(
    { url: "/currencies/fees", rowBuilder, params },
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
type ToggleCoinFavoriteParams = {
  currency_id: string;
  type: "remove" | "add";
};
export default function toggleCoinFavoriteDS(params: ToggleCoinFavoriteParams) {
  return http.put("/currencies/AddOrRemoveFavorite", params);
}

export function useUpdatedCoinPriceDS(refreshInterval: number) {
  return useFetch("/currencies/prices", {
    revalidateOnFocus: false, //true
    revalidateOnMount: false, //true
    // revalidateOnReconnect: false, //true
    // refreshWhenOffline: false, //false
    // refreshWhenHidden: false, //false
    refreshInterval, //disabled = 0
  });
}
