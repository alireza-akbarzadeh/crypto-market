import { DefaultFetchConfig } from "./../../../../core/constants/types";
import http from "@/core/http";
import { useFetch, useInfiniteFetch, useSelector } from "@/core/hooks";
export function useAssetSummeryDS() {
  return useFetch("/asset/init", {
    revalidateOnFocus: false, //true
    revalidateOnMount: false, //true
    // revalidateOnReconnect: false, //true
    // refreshWhenOffline: false, //false
    // refreshWhenHidden: false, //false
    // refreshInterval: 0, //disabled = 0
  });
}
export function useAssetItemsDS(id?: string) {
  return useFetch(id ? "/asset/" + id : null, {
    revalidateOnFocus: false, //true
    // revalidateOnMount: false, //true
    // revalidateOnReconnect: false, //true
    // refreshWhenOffline: false, //false
    // refreshWhenHidden: false, //false
    // refreshInterval: 0, //disabled = 0
  });
}
export function useAssetsDS<RT>(rowBuilder?: any, config?: DefaultFetchConfig) {
  const { token } = useSelector((state) => state.auth);
  return useInfiniteFetch<RT>(
    { url: token ? "/asset" : null, rowBuilder },
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
type CreateAssetParams = {
  side: "buy" | "sell";
  amount: number;
  currency_id: string;
  price: number;
};
export async function createAssetDS(params: CreateAssetParams) {
  return http.post("/asset", params);
}
type EditAssetParams = {
  side: "buy" | "sell";
  amount: number;
  currency_id: string;
  price: number;
};
export async function editAssetDS(id: string, params: EditAssetParams) {
  return http.put("/asset/" + id, params);
}
export async function deleteAssetDS(id: string) {
  return http.delete("/asset/" + id);
}
export async function GetAvailableAssetBalanceDS(currency_id: string) {
  return http.post("/asset/GetAvailableAssetBalanceAction", { currency_id });
}
