import { usePaginateHelpers, useWindowDimensions } from "@/core/hooks";
import { UrlParams } from "@/core/hooks/useInfiniteFetch";
import { GetPaginateHookType } from "@/core/hooks/usePaginateHelpers";
import {
  memo,
  MutableRefObject,
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { areEqual } from "react-window";
import InfiniteListView, { InfiniteListRowType } from "./infinite-list.view";

type InfiniteListChildrenParams<RowData> = {
  List: any;
  rows: RowData[];
  isLoading: boolean;
  setInputValue: (val: string) => void;
  inputValue: string;
  searchText: string;
  setSearchText: (val: string) => void;
  error?: any;
  meta: any;
};

type PropTypes<RowData, ItemData> = {
  pageSize?: number;
  width?: string | number;
  getHook: GetPaginateHookType<RowData>;
  getItemData: (rows: RowData[], meta: any, mutate: () => void) => ItemData;
  direction?: "rtl" | "ltr";
  threshold?: number;
  Row: InfiniteListRowType<ItemData>;
  children: (params: InfiniteListChildrenParams<RowData>) => ReactElement;
  itemSize: number;
  variableSize?: boolean;
  params?: UrlParams;
  revalidateOnMount?: boolean;
};
export default function InfiniteListComponent<RowData, ItemData>(
  props: PropTypes<RowData, ItemData>
) {
  const {
    pageSize = 20,
    getHook,
    width = "100%",
    getItemData,
    direction = "rtl",
    itemSize,
    threshold,
    Row,
    children,
    variableSize,
    params,
    revalidateOnMount,
  } = props;
  const { height } = useWindowDimensions();
  const listRef = useRef<any>({});
  const rowHeights = useRef<any>({});
  const {
    search: { setInputValue, inputValue, searchText, setSearchText },
    rows,
    meta,
    error,
    fakeItemCount,
    handleItemLoaded,
    handleLoadMore,
    isLoading,
    mutate,
  } = usePaginateHelpers(getHook, pageSize, params);

  useEffect(() => {
    if (revalidateOnMount && rows.length) mutate();
  }, []);

  const resetList = (idx = 0, force?: boolean) => {
    if (!listRef?.current?.resetAfterIndex) return true;
    listRef.current.resetAfterIndex(0, force);
  };

  const _itemSize = useMemo(() => {
    if (!variableSize) return itemSize;
    return (index: number) => {
      return rowHeights.current[index] || itemSize;
    };
  }, [itemSize, variableSize]);

  const itemData = useMemo(() => {
    if (!variableSize) return getItemData(rows, meta, mutate);

    return {
      setRowHeight: (index: number, size: number) => {
        const failed = resetList(index);
        if (failed) return;
        rowHeights.current = { ...rowHeights.current, [index]: size };
      },
      ...getItemData(rows, meta, mutate),
    };
  }, [rows]);

  return (
    children({
      error,
      rows,
      isLoading,
      setInputValue,
      inputValue,
      searchText,
      setSearchText,
      meta,
      List: (
        <InfiniteListView
          {...{
            listRef,
            handleItemLoaded,
            itemCount: fakeItemCount,
            handleLoadMore,
            height,
            itemData,
            direction,
            width,
            threshold,
            Row,
            variableSize,
            estimatedItemSize: itemSize as any,
            itemSize: _itemSize as any,
          }}
        />
      ),
    }) || null
  );
}
type VariableRowBuilderParams<T = any> = {
  index: number;
  style: any;
  data: T;
  rowRef: MutableRefObject<any>;
};

export function variableRowBuilder(
  Component: (params: VariableRowBuilderParams) => ReactElement
) {
  return memo(({ index, style, data }: any) => {
    const { setRowHeight, ..._data } = data;
    const rowRef = useRef<any>({});
    const _row = data.rows ? data.rows[index] : undefined;

    useEffect(() => {
      if (rowRef.current) {
        setRowHeight(index, rowRef.current.clientHeight);
      }
    }, [rowRef, _row]);

    return <Component {...{ index, style, data: _data, rowRef }} />;
  }, areEqual);
}

type FixedRowBuilderParams<T = any> = {
  index: number;
  style: any;
  data: T;
};
export function fixedRowBuilder(
  Component: (params: FixedRowBuilderParams) => ReactElement
) {
  return memo(({ index, style, data }: any) => {
    return <Component {...{ index, style, data }} />;
  }, areEqual);
}
