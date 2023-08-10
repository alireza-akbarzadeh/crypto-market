import { useFetch, useSelector } from "@/core/hooks";
import http from "@/core/http";

export function useKycStatusDS() {
  const { token } = useSelector((state) => state.auth);
  return useFetch(token ? "/user/identityVerification" : null, {
    revalidateOnFocus: false, //true
    // revalidateOnMount: false, //true
    // revalidateOnReconnect: false, //true
    // refreshWhenOffline: false, //false
    // refreshWhenHidden: false, //false
    // refreshInterval: 0, //disabled = 0
    // ...config,
  });
}
export async function uploadKycNationalCardDS(data: FormData) {
  return http.post("/user/identityVerification/image/store", data);
}
export async function uploadKycVideoDS(data: FormData) {
  return http.post("/user/identityVerification/video/store", data);
}
export async function kycNationalCardSerialNumberDS(national: string) {
  return http.post("/user/identityVerification/nationalSerial/store", {
    national,
  });
}
