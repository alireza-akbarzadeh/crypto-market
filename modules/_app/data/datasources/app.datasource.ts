import { DefaultFetchConfig } from "@/core/constants/types";
import { useFetch } from "@/core/hooks";

export function useAppInitialsDS(config?: DefaultFetchConfig) {
  return useFetch("/init", {
    revalidateOnFocus: false, //true
    revalidateOnMount: false, //true
    // revalidateOnReconnect: false, //true
    // refreshWhenOffline: false, //false
    // refreshWhenHidden: false, //false
    // refreshInterval: 0, //disabled = 0
    ...config,
  });
}
