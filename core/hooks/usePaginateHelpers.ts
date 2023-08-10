import { UrlParams } from "./useInfiniteFetch";
import { useMemo } from "react";
import { useDebouncedState } from "@/core/hooks";

export type GetPaginateHookType<T> = (params?: UrlParams) => {
  rows: T[];
  meta?: any;
  size: number;
  setSize: (size: number) => void;
  isLoading: boolean;
  mutate: () => void;
  isValidating?: boolean;
  error?: any;
};

export default function usePaginateHelpers<T = any>(
  getHook: GetPaginateHookType<T>,
  _pageSize: number,
  params?: UrlParams
) {
  const [inputValue, searchText, setInputValue, setSearchText] =
    useDebouncedState("");
  const { rows, meta, size, setSize, isLoading, mutate, error } = getHook({
    ...params,
    q: searchText,
  });

  const fakeItemCount = useMemo(() => {
    if (!meta?.paginateHelper) return _pageSize;
    const {
      pageSize = _pageSize,
      currentPage,
      lastPage,
      total,
    } = meta.paginateHelper;
    const fakeTotal = pageSize * (currentPage + 1);
    if (fakeTotal > total) {
      return total;
    }
    return fakeTotal + 1;
  }, [meta]);

  const handleItemLoaded = (index: number) => Boolean(rows[index]);
  const handleLoadMore = (start: number) => {
    if (!meta?.paginateHelper || !start) {
      if (size < 1) {
        setSize(1);
      }
      return;
    }
    const page = start / (meta.paginateHelper.pageSize || _pageSize) + 1;
    if (page !== Math.floor(page)) return;
    if (size !== page) {
      setSize(page);
    }
  };

  return {
    search: { inputValue, searchText, setInputValue, setSearchText },
    rows,
    meta,
    fakeItemCount,
    handleItemLoaded,
    handleLoadMore,
    isLoading,
    setSize,
    mutate,
    error,
  };
}
