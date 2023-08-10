import { useFetch, useInfiniteFetch, useSelector } from "@/core/hooks";
import { UrlParams } from "@/core/hooks/useInfiniteFetch";
import http from "@/core/http";

// const baseUrl = "http://135.181.199.143:7070/api/v1/priceAlert/alerts";
const baseUrl = "https://api.crypto.com/api/v1";

export function usePriceAlertsDS() {
  return useFetch(baseUrl + "/priceAlert/alerts/get", {
    revalidateOnFocus: false, //true
    // revalidateOnMount: false, //true
    // revalidateOnReconnect: false, //true
    // refreshWhenOffline: false, //false
    // refreshWhenHidden: false, //false
    //   refreshInterval, //disabled = 0
  });
}

export function useCoinNotificationsDS<RT>(
  rowBuilder: (data: any) => RT,
  params?: UrlParams
) {
  const { token } = useSelector((s) => s.auth);
  return useInfiniteFetch(
    {
      url: token ? `${baseUrl}/priceAlert/alerts/get` : null,
      params,
      rowBuilder,
    },
    {
      revalidateOnFocus: false, //true
      revalidateOnMount: false, //true
      // revalidateOnReconnect: false, //true
      // refreshWhenOffline: false, //false
      // refreshWhenHidden: false, //false
      //   refreshInterval, //disabled = 0
    }
  );
}

type ChangeAlertStatusParams = {
  alert_id: string;
  status: boolean;
};
export function changeAlertReachedDS(model: ChangeAlertStatusParams) {
  return http.post(baseUrl + "/priceAlert/alerts/status", model);
}
export function deleteAlertDS(id: string) {
  return http.post(baseUrl + "/priceAlert/alerts/delete", { id });
}
type CreateAlertParams = {
  price: number;
  coin: string;
  up: boolean;
  pair: "USDT" | "IRT";
  side: "buy" | "sell";
};
export function createAlertDS(params: CreateAlertParams) {
  return http.post(baseUrl + "/priceAlert/alerts/create", params);
}

export function useNotificationsDS() {
  return useFetch(baseUrl + "/notifications/settings/getSettings", {
    revalidateOnFocus: false, //true
    // revalidateOnMount: false, //true
    // revalidateOnReconnect: false, //true
    // refreshWhenOffline: false, //false
    // refreshWhenHidden: false, //false
    //   refreshInterval, //disabled = 0
  });
}
type ChangeNotificationChannelParams = {
  notificationCategory: string;
  channel: string;
  status: boolean;
};
export function changeNotificationChannelStatusDS(
  model: ChangeNotificationChannelParams
) {
  return http.put(
    baseUrl + "/notifications/settings/changeChannelStatus",
    model
  );
}
export function connectTelegramDS(chatId: string) {
  return http.post(baseUrl + "/notifications/settings/SaveTgChatId", {
    chatId,
  });
}
export function disconnectTelegramDS() {
  return http.delete(baseUrl + "/notifications/settings/DeleteTgChatId");
}
