import React, { useEffect, useMemo } from "react";
import useCoinPrices from "@/modules/coin/domain/usecases/useCoinPrices";
import {
  useIsDesktopSize,
  useSelector,
  useUpdateEffect,
  useWindowDimensions,
} from "@/core/hooks";
import toggleCoinFavorite from "@/modules/coin/domain/usecases/toggleCoinFavorite";
import useCoinSocket from "@/modules/coin/domain/usecases/useCoinSocket";
import dynamic from "next/dynamic";
const CoinTableView = dynamic(() => import("./coin-table.view"), {
  ssr: false,
});

type PropTypes = {
  searchText: string;
  mode: string;
  setCount: (v: number) => void;
  showFavorites: boolean;
  sort?: string;
  fallbackData: any;
};
export default function CoinTableComponent(props: PropTypes) {
  const { searchText, mode, setCount, showFavorites, sort, fallbackData } =
    props;
  const { rows, meta, size, setSize, isLoading, mutate } = useCoinPrices(
    {
      searchText,
      favorite: showFavorites,
      sort,
    },
    { fallbackData }
  );
  const isDesktopSize = useIsDesktopSize();
  const { height } = useWindowDimensions();
  const { token } = useSelector((s) => s.auth);
  const socketData = useCoinSocket();

  const itemCount = useMemo(() => {
    if (!meta?.paginateHelper) return 20;
    const { pageSize = 20, currentPage, lastPage, total } = meta.paginateHelper;
    const fakeTotal = pageSize * (currentPage + 1);
    if (fakeTotal > total) {
      return total;
    }
    return fakeTotal + 1;
  }, [meta]);

  useEffect(() => {
    if (!socketData || isLoading) return;

    mutate((data) => {
      if (!data?.length) return data;
      return data.map((req: any) => {
        if (!req?.result?.items?.length) return req;
        const {
          result: { items, meta },
          ...o
        } = req;
        return {
          ...o,
          result: {
            meta,
            items: items.map((i: any) => {
              if (!socketData[i.coin]) return i;
              const { changes, price } = socketData[i.coin];
              return {
                ...i,
                price: price || i.price,
                percent: changes || i.percent,
              };
            }),
          },
        };
      });
    }, false);
  }, [socketData]);

  useEffect(() => {
    if (rows.length) {
      mutate();
    }
  }, []);

  useUpdateEffect(() => {
    mutate();
  }, [token]);

  useEffect(() => {
    if (!meta?.paginateHelper) return;
    setCount(meta.paginateHelper.total);
  }, [meta?.paginateHelper?.total]);

  const handleItemLoaded = (index: number) => Boolean(rows[index]);
  const handleLoadMore = (start: number) => {
    if (!meta?.paginateHelper || !start) {
      if (size < 1) {
        setSize(1);
      }
      return;
    }
    const page = start / (meta.paginateHelper.pageSize || 20) + 1;
    if (page !== Math.floor(page)) return;
    if (size !== page) {
      setSize(page);
    }
  };
  const toggleStar = async (index: number) => {
    function toggle() {
      const { shortName, favorite } = rows[index];
      mutate((data) => {
        if (!data?.length) return;
        return data.map((req) => {
          if (!req?.result?.items?.length) return req;
          const {
            result: { items, ...ro },
            ...o
          } = req;

          return {
            ...o,
            result: {
              ...ro,
              items: items.map((i: any) => {
                if (i.coin !== shortName) return i;
                return { ...i, isFavorite: !favorite };
              }),
            },
          };
        });
      }, false);
    }
    const shouldRemove = rows[index].favorite;
    toggle();
    const { error } = await toggleCoinFavorite(rows[index].id, shouldRemove);
    if (error) toggle();
  };
  return (
    <CoinTableView
      {...{
        mode,
        rows,
        handleItemLoaded,
        meta,
        handleLoadMore,
        itemCount,
        isDesktopSize,
        windowInnerHeight: height,
        isLoading,
        toggleStar,
      }}
    />
  );
}
