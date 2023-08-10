import { UrlParams } from "@/core/hooks/useInfiniteFetch";
import { GetPaginateHookType } from "@/core/hooks/usePaginateHelpers";
import PaginationListView from "./pagination-list.view";
import { useIsDesktopSize, usePaginateHelpers } from "@/core/hooks";
import { ReactElement, useMemo } from "react";

type PaginationListChildrenParams<RowData> = {
  rows: RowData[];
  isLoading: boolean;
  Pagination: ReactElement;
};
type PropTypes<RowData> = {
  getHook: GetPaginateHookType<RowData>;
  params?: UrlParams;
  pageSize: number;
  children: (params: PaginationListChildrenParams<RowData>) => ReactElement;
};
export default function PaginationListComponent<T>(props: PropTypes<T>) {
  const { getHook, params, pageSize, children } = props;
  const isDesktopSize = useIsDesktopSize();

  const {
    // search: { setInputValue, inputValue, searchText, setSearchText },
    rows,
    meta,
    setSize,
    isLoading,
  } = usePaginateHelpers(getHook, pageSize, params);
  const _rows = useMemo(() => {
    if (isLoading && (!rows || !rows.length))
      return Array(pageSize).fill(undefined);
    return rows;
  }, [rows]);

  const handleChange = (_: any, page: number) => {
    setSize(page);
  };

  return children({
    rows: _rows,
    isLoading,
    Pagination: (
      <PaginationListView
        {...meta}
        {...{ isLoading, handleChange, isDesktopSize }}
      />
    ),
  });
}
