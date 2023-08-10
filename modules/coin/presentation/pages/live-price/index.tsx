import { useDebouncedState, useDispatch } from "@/core/hooks";
import useUser from "@/modules/auth/domain/usecases/useUser";
import { openLoginModal } from "@/modules/auth/presentation/redux";
import { getCoinPricesDS } from "@/modules/coin/data/datasources/coin.datasource";
import { LivePriceSortOption } from "@/modules/_app/domain/entities/appInitials";
import useAppInitials from "@/modules/_app/domain/usecases/useAppInitials";
import { GetStaticProps } from "next";
import { useRef, useState } from "react";
import LivePriceView from "./live-price.view";

type PropTypes = { coinsData: any };
export default function LivePricePage(props: PropTypes) {
  const [inputValue, searchText, setInputValue] = useDebouncedState("", 500);
  const handleInputChange = (e: any) => setInputValue(e.target.value);
  const [mode, setMode] = useState("toman");
  const [showFavorites, setShowFavorites] = useState(false);
  const [count, setCount] = useState<number>();
  const [sort, setSort] = useState<LivePriceSortOption>();
  const { user } = useUser();
  const dispatch = useDispatch();
  const sortAnchorEl = useRef();
  const [sortOpen, setSortOpen] = useState(false);
  const { data: appInitials } = useAppInitials();

  const toggleShowFavorites = () => {
    if (!user) {
      dispatch(openLoginModal());
      return;
    }
    setShowFavorites((v) => !v);
  };
  const sortChange = (sort?: LivePriceSortOption) => {
    setSort(sort);
    setSortOpen(false);
  };

  return (
    <LivePriceView
      {...{
        handleInputChange,
        inputValue,
        searchText,
        mode,
        setMode: (mode) => setMode(mode),
        showFavorites,
        toggleShowFavorites,
        count,
        setCount: (v) => setCount(v),
        sort,
        sortChange,
        sortAnchorEl,
        sortOpen,
        setSortOpen,
        sortOptions: appInitials?.filters.livePrice || [],
        fallbackData: props.coinsData,
      }}
    />
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const coinsRes = await getCoinPricesDS({ page: 1 });
  return { props: { coinsData: [coinsRes] }, revalidate: 60 };
};
