import { useSelector } from "@/core/hooks";
import { useInfiniteFetch } from "@/core/hooks";
import http from "@/core/http";

export function useCommentsDS<RT>(rowBuilder?: any) {
  return useInfiniteFetch<RT>(
    { url: "/comments", rowBuilder },
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
type AddCommentParams = {
  body: string;
};
export function addCommentDS(params: AddCommentParams) {
  return http.post("/comments", params);
}
export function useContactUsDS<RT>(rowBuilder?: any) {
  const { token } = useSelector((state) => state.auth);
  return useInfiniteFetch<RT>(
    { url: token ? "/contactUs" : null, rowBuilder },
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
type AddContactUsParams = {
  body: string;
};
export function addContactUsDS(params: AddContactUsParams) {
  return http.post("/contactUs", params);
}
