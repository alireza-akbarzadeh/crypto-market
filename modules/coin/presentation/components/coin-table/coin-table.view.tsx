import styles from "./coin-table.module.scss";
import cellStyles from "../../utils/coin-table-cells.module.scss";
import React, { memo } from "react";
import { Box, Typography, BottomNavigation } from "@mui/material";
import clsx from "clsx";
import { CoinDataInterface } from "@/modules/coin/domain/entities/coin";
import { FixedSizeList, areEqual } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import CoinTableRowComponent from "../coin-table-row";
import { ReactWindowScroller } from "react-window-scroller";
import { mergeRefs } from "@/core/helpers";
import LoadingComponent from "@/core/components/common/loading";
import EmptyContentComponent from "@/core/components/common/empty-content";

type PropTypes = {
  mode: string;
  rows: CoinDataInterface[];
  handleItemLoaded: (index: number) => boolean;
  handleLoadMore: (start: number, stop: number) => void;
  itemCount: number;
  windowInnerHeight: number;
  isDesktopSize: boolean;
  isLoading: boolean;
  // mutate: () => void;
  toggleStar: (index: number) => void;
};
export default function CoinTableView(props: PropTypes) {
  const {
    mode,
    rows,
    handleItemLoaded,
    handleLoadMore,
    itemCount,
    isDesktopSize,
    windowInnerHeight,
    isLoading,
    // mutate,
    toggleStar,
  } = props;

  const renderNotFound = () => {
    if (isLoading || rows.length) return null;
    return <EmptyContentComponent message="چیزی یافت نشد." />;
  };

  if (isDesktopSize) {
    return (
      <div className={styles.root}>
        <div className={styles.header}>
          <Typography component="span" className={cellStyles.name}>
            ارز دیجیتال
          </Typography>
          <Typography component="span" className={cellStyles.buy}>
            {mode === "toman" ? "قیمت خرید" : "قیمت جهانی"}
          </Typography>
          <Typography component="span" className={cellStyles.sell}>
            {mode === "toman" ? "قیمت فروش" : "ارزش بازار"}
          </Typography>
          <Typography component="span" className={cellStyles.chart}>
            نمودار
          </Typography>
          <Typography component="span" className={cellStyles.changes}>
            تغییرات
          </Typography>
          <Typography component="span" className={cellStyles.favorite}>
            نشان کردن
          </Typography>
        </div>
        <ReactWindowScroller>
          {({ ref, outerRef, style, onScroll }: any) => (
            <InfiniteLoader
              isItemLoaded={handleItemLoaded}
              itemCount={itemCount}
              loadMoreItems={handleLoadMore}
              threshold={10}
            >
              {({ onItemsRendered, ref: loaderRef }) => (
                <FixedSizeList
                  ref={mergeRefs(ref, loaderRef)}
                  outerRef={outerRef}
                  style={style}
                  height={windowInnerHeight}
                  onScroll={onScroll}
                  // direction={mode === "tether" ? "ltr" : "rtl"}
                  direction="ltr"
                  itemCount={itemCount}
                  itemSize={76}
                  itemData={{
                    rows,
                    mode,
                    isDesktopSize,
                    // mutate,
                    toggleStar,
                  }}
                  onItemsRendered={onItemsRendered}
                  width={"100%"}
                >
                  {Row}
                </FixedSizeList>
              )}
            </InfiniteLoader>
          )}
        </ReactWindowScroller>
        {renderNotFound()}
        <LoadingComponent loading={isLoading} />
      </div>
    );
  }

  return (
    <>
      <Box
        className={clsx(
          styles.scrollableWrapper,
          mode === "tether" ? styles.ltrContainer : styles.rtlContainer
        )}
      >
        <ReactWindowScroller>
          {({ ref, outerRef, style, onScroll }: any) => (
            <InfiniteLoader
              isItemLoaded={handleItemLoaded}
              itemCount={itemCount}
              loadMoreItems={handleLoadMore}
              threshold={10}
            >
              {({ onItemsRendered, ref: loaderRef }) => (
                <FixedSizeList
                  ref={mergeRefs(ref, loaderRef)}
                  outerRef={outerRef}
                  style={style}
                  height={windowInnerHeight}
                  onScroll={onScroll}
                  direction="rtl"
                  itemCount={itemCount}
                  itemSize={54}
                  itemData={{
                    rows,
                    mode,
                    isDesktopSize,
                    // mutate,
                    toggleStar,
                  }}
                  onItemsRendered={onItemsRendered}
                  width={"100%"}
                >
                  {Row}
                </FixedSizeList>
              )}
            </InfiniteLoader>
          )}
        </ReactWindowScroller>
        {renderNotFound()}
        <LoadingComponent loading={isLoading} />
        <BottomNavigation sx={{ opacity: 0, zIndex: -1 }} />
      </Box>
    </>
  );
}

const Row = memo(({ index, style, data }: any) => {
  return (
    <CoinTableRowComponent
      {...{
        index,
        style,
        data: data.rows[index],
        mode: data.mode,
        isDesktopSize: data.isDesktopSize,
        // mutate: data.mutate,
        toggleStar: () => data.toggleStar(index),
      }}
    />
  );
}, areEqual);
