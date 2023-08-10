import useSWR, { Key } from "swr";
import http from "@/core/http";
import { DefaultFetchConfig } from "../constants/types";
import { AxiosRequestConfig } from "axios";

const fetcher = (config: AxiosRequestConfig) => {
  if (typeof config === "string") {
    config = { url: config };
  }

  const { url, ...other } = config;

  return http.get(url!, other).then((res: any) => res);
};

export default function useFetch(key: Key, config?: DefaultFetchConfig) {
  return useSWR(key, fetcher, config);
}
