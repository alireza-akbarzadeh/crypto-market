import http from "@/core/http";
import { useFetch, useInfiniteFetch, useSelector } from "@/core/hooks";
import { DefaultFetchConfig } from "@/core/constants/types";

type UserCardInquiryParams = {
  card_number: number;
};
export async function userCardInquiryDS<T = any>(model: UserCardInquiryParams) {
  return http.post<T>("/user/card/inquiry", model);
}

type UserAddCardParams = {
  track_id: string;
};
export async function userAddCardDS<T = any>(model: UserAddCardParams) {
  return http.post<T>("/user/card", model);
}

export function useUserBankCardsDS(
  accepted?: boolean,
  config?: DefaultFetchConfig
) {
  return useFetch("/user/card" + (accepted ? "?status=confirmed" : ""), {
    revalidateOnFocus: false, //true
    // revalidateOnMount: false, //true
    // revalidateOnReconnect: false, //true
    // refreshWhenOffline: false, //false
    // refreshWhenHidden: false, //false
    // refreshInterval: 0, //disabled = 0
    ...config,
  });
}

export function userDeleteCardDS(cardId: string) {
  return http.delete("/user/card/" + cardId);
}

type UserIbanInquiryParams = {
  iban_number: number;
};
export async function userIbanInquiryDS<T = any>(model: UserIbanInquiryParams) {
  return http.post<T>("/user/iban/inquiry", model);
}
type UserAddIbanParams = {
  track_id: string;
};
export async function userAddIbanDS<T = any>(model: UserAddIbanParams) {
  return http.post<T>("/user/iban", model);
}
export function useUserIbanListDS(
  accepted?: boolean,
  config?: DefaultFetchConfig
) {
  return useFetch("/user/iban" + (accepted ? "?status=confirmed" : ""), {
    revalidateOnFocus: false, //true
    // revalidateOnMount: false, //true
    // revalidateOnReconnect: false, //true
    // refreshWhenOffline: false, //false
    // refreshWhenHidden: false, //false
    // refreshInterval: 0, //disabled = 0
    ...config,
  });
}

export function userDeleteIbanDS(ibanId: string) {
  return http.delete("/user/iban/" + ibanId);
}

type ProfileUpdateDSParams = {
  fatherName: string;
  birthDay: string;
  nationalCode: string;
};
export function profileUpdateDS(params: ProfileUpdateDSParams) {
  return http.post("/profile/update", params);
}

export function useProfileAvatarDS<RT>(
  rowBuilder?: any,
  config?: DefaultFetchConfig
) {
  const { token } = useSelector((state) => state.auth);
  return useInfiniteFetch<RT>(
    { url: token ? "/user/avatar" : null, rowBuilder },
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

type ChangeProfileAvatarDSParams = {
  avatar_id: string;
};
export function changeProfileAvatarDS(params: ChangeProfileAvatarDSParams) {
  return http.put("/user/avatar/changeAvatar", params);
}
