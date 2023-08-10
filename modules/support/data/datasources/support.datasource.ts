import http from "@/core/http";
import { useFetch, useInfiniteFetch, useSelector } from "@/core/hooks";

export function useSupportCategoriesDS() {
  return useFetch("/support/getSupportCategories", {
    revalidateOnFocus: false, //true
    // revalidateOnMount: false, //true
    // revalidateOnReconnect: false, //true
    // refreshWhenOffline: false, //false
    // refreshWhenHidden: false, //false
    // refreshInterval: 0, //disabled = 0
  });
}
export function useSupportTutorialsDS<RT>(rowBuilder: (init: any) => RT) {
  return useInfiniteFetch<RT>(
    { url: "/support/getTutorial", rowBuilder },
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
export function useLatestOrdersDS<RT>(rowBuilder: (init: any) => RT) {
  return useInfiniteFetch<RT>(
    { url: "/support/getLatestOrderAction", rowBuilder },
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

export async function createTicketDS(params: any) {
  return http.post("/support/ticket", params);
}

export function useTicketsDS<RT>(
  rowBuilder: (init: any) => RT,
  fetchOnMount: boolean
) {
  const { token } = useSelector((state) => state.auth);
  return useInfiniteFetch<RT>(
    {
      url: token ? "/support/getSupportTicket" : null,
      rowBuilder,
      fetchOnMount,
    },
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

export function useTicketChatDS<RT>(id: string, rowBuilder: (init: any) => RT) {
  return useInfiniteFetch<RT>(
    { url: id ? "/support/getSupportTicket/" + id : null, rowBuilder },
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
