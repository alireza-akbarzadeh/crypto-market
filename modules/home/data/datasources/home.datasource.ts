import http from "@/core/http";

export async function getHomeDataDS() {
  return http.get(
    "https://api.crypto.com/api/v1/superApp/home?currenciesPageSize=10"
  );
}
