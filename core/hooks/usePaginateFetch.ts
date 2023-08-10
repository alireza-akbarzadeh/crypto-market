import { useMemo, useState } from "react";
import useSWR from "swr";
import http from "@/core/http";
import { DefaultFetchConfig } from "../constants/types";
import { makeQueryString } from "../helpers";

export type UrlParams = { [key: string]: any };
type PaginateFetchKeyOptions<RT> = {
  url: string | null;
  params?: UrlParams;
  rowBuilder?: (data: any) => RT;
};

export default function usePaginateFetch<RT = any>(
  { url, params, rowBuilder }: PaginateFetchKeyOptions<RT>,
  config?: DefaultFetchConfig
) {
  const [page, setPage] = useState(1);
  const { data, error, mutate, isValidating } = useSWR(
    paginationKeyGenerator(url, page, params),
    (url: string) => http.get(url).then((res: any) => res),
    config
  );

  const meta = getPaginateMeta(data);
  const rows: RT[] = useMemo(() => {
    return getRows(data, rowBuilder);
  }, [data, rowBuilder]);

  const isLoadingInitialData = Boolean(!data && !error && url);
  const isLoading = isLoadingInitialData || isValidating;

  return {
    rows,
    meta,
    error,
    mutate,
    isValidating,
    setSize: setPage,
    size: page,
    isLoadingInitialData,
    isLoading,
  };
}

// helpers
function paginationKeyGenerator(
  url: string | null,
  page: number,
  params?: UrlParams
) {
  if (!url) return url;
  const queryString = makeQueryString(params);

  return `${url}?page=${page}${queryString ? "&" + queryString : ""}`;
}

function getPaginateMeta(data: any) {
  if (data && data.result) {
    return data.result.meta;
  }
  return {};
}
function getRows(data: any, rowBuilder: any) {
  if (!rowBuilder || !data || !data.result) return [];
  return data.result.items.map(rowBuilder);
}
