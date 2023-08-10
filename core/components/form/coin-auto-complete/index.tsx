import { usePaginateHelpers } from "@/core/hooks";
import useCoinPrices from "@/modules/coin/domain/usecases/useCoinPrices";
import { WalletAddressCoinInterface } from "@/modules/wallet/domain/entities/coin";
import useWalletAddressCoins from "@/modules/wallet/domain/usecases/useWalletAddressCoins";
import { useMemo, useState } from "react";
import CoinAutoCompleteView from "./coin-auto-complete.view";

export type CoinAutoCompleteProps = {
  onChange?: (value: WalletAddressCoinInterface) => void;
  error?: string;
  noNetwork?: boolean;
};
export default function CoinAutoCompleteComponent(
  props: CoinAutoCompleteProps
) {
  const { onChange, error, noNetwork } = props;
  const [value, setValue] = useState<WalletAddressCoinInterface>();
  const [isOpen, setIsOpen] = useState(false);
  const getHook: any = useMemo(() => {
    return noNetwork
      ? ({ q }: any) => useCoinPrices({ searchText: q })
      : useWalletAddressCoins;
  }, [noNetwork]);
  const {
    rows,
    meta,
    search: { setInputValue, inputValue, searchText, setSearchText },
    handleLoadMore,
    isLoading,
    setSize,
  } = usePaginateHelpers(getHook, 20);

  const _options = useMemo(() => {
    if (!value || rows.find((r) => r.shortName === value.shortName)) {
      return rows;
    }
    return [value, ...rows];
  }, [rows, value]);

  const handleChange = (event: any, newValue: WalletAddressCoinInterface) => {
    if (onChange) onChange(newValue);
    setValue(newValue);
  };
  const handleInputChange = (event: any) => {
    setInputValue(event.target.value || "");
  };
  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setInputValue("");
    }, 0);
  };
  const handleScroll = (e: any) => {
    const { scrollHeight, scrollTop, offsetHeight } = e.target;
    const scrollBottom = scrollHeight - (scrollTop + offsetHeight);
    if (isLoading || scrollBottom > 60 || !meta) return;

    const { currentPage, lastPage } = meta.paginateHelper;
    if (currentPage >= lastPage) return;
    setSize(currentPage + 1);
  };

  return (
    <CoinAutoCompleteView
      {...{
        options: _options,
        value,
        handleChange,
        handleInputChange,
        onOpen: () => setIsOpen(true),
        onClose: handleClose,
        loading: isLoading || searchText !== inputValue,
        isOpen,
        inputValue,
        error,
        handleScroll,
      }}
    />
  );
}
