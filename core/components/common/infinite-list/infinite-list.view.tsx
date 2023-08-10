import InfiniteLoader from "react-window-infinite-loader";
import { ReactWindowScroller } from "react-window-scroller";
import {
  FixedSizeList,
  areEqual,
  ListChildComponentProps,
  VariableSizeList,
} from "react-window";
import { ComponentType, MutableRefObject, ReactNode, useMemo } from "react";
import styles from "./infinite-list.module.scss";
import { mergeRefs } from "@/core/helpers";

export type InfiniteListRowType<ItemData> = React.MemoExoticComponent<
  (params: { index: number; style: any; data: ItemData }) => JSX.Element
>;
type SharedPropTypes<ItemData> = {
  handleItemLoaded: (index: number) => boolean;
  itemCount: number;
  handleLoadMore: (
    startIndex: number,
    stopIndex: number
  ) => Promise<void> | void;
  height: number | string;
  width: number | string;
  itemData: ItemData;
  direction: "ltr" | "rtl";
  threshold?: number;
  Row: InfiniteListRowType<ItemData>;
  listRef: MutableRefObject<any>;
};
type PropTypes<ItemData> = (
  | {
      itemSize: (index: number) => number;
      estimatedItemSize: number;
      variableSize: true;
    }
  | {
      itemSize: number;
      estimatedItemSize?: undefined;
      variableSize?: false;
    }
) &
  SharedPropTypes<ItemData>;

export default function InfiniteListView<T>(props: PropTypes<T>) {
  const {
    handleItemLoaded,
    itemCount,
    handleLoadMore,
    height,
    itemData,
    direction,
    itemSize,
    width,
    threshold,
    Row,
    variableSize,
    estimatedItemSize,
    listRef,
  } = props;

  const List: any = useMemo(() => {
    return variableSize ? VariableSizeList : FixedSizeList;
  }, [variableSize]);

  return (
    <ReactWindowScroller>
      {({ ref, outerRef, style, onScroll }: any) => (
        <InfiniteLoader
          isItemLoaded={handleItemLoaded}
          itemCount={itemCount}
          loadMoreItems={handleLoadMore}
          threshold={threshold}
        >
          {({ ref: loaderRef, onItemsRendered }) => (
            <List
              className="overflow-visible"
              {...{
                ref: mergeRefs(ref, loaderRef, listRef),
                // ref: loaderRef,
                outerRef,
                style,
                onScroll,
                direction,
                itemCount,
                itemData,
                onItemsRendered,
                itemSize,
                height,
                width,
                estimatedItemSize,
              }}
            >
              {Row}
            </List>
          )}
        </InfiniteLoader>
      )}
    </ReactWindowScroller>
  );
}
