import { CoinDataInterface } from "@/modules/coin/domain/entities/coin";
import { TextFieldProps } from "@mui/material";
import { useState, useMemo, useEffect } from "react";
import CoinSelectView from "./coin-select.view";
import useCoinPrices from "@/modules/coin/domain/usecases/useCoinPrices";
import { useDebouncedState, useUpdateEffect } from "@/core/hooks";
import useUpdatedCoinPrice from "@/modules/coin/domain/usecases/useUpdatedCoinPrice";

export type CoinSelectProps = {
  label?: string;
  value?: string; // coin.shortName
  onChange?: (coin: CoinDataInterface) => void;
  onCoinChange?: (coin: CoinDataInterface) => void;
  isSell?: boolean;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  skipInput?: boolean; // skips selected input (like in home screen)
  skipPrice?: boolean; // skips price in list
  updatePrice?: boolean; // update price every 60 seconds
  fallbackData?: any;
  selectedCoin?: CoinDataInterface;
} & TextFieldProps;

export default function CoinSelectComponent(props: CoinSelectProps) {
  const {
    value,
    onChange,
    onCoinChange,
    updatePrice,
    open = false,
    setOpen = () => {},
    fallbackData,
    selectedCoin,
    ...other
  } = props;

  const [inputValue, searchText, setInputValue, setSearchText] =
    useDebouncedState("");
  const { rows, meta, size, setSize, mutate, isLoading } = useCoinPrices(
    { searchText },
    { fallbackData }
  );
  const [isOpen, setIsOpen] = useState(open);
  const [selected, setSelected] = useState<CoinDataInterface>(selectedCoin!);
  const { data: updatedData } = useUpdatedCoinPrice(updatePrice ? 60000 : 0);
  const [selecting, setSelecting] = useState<string>();

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useEffect(() => {
    if (!updatedData) return;
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
              if (!i?.coin) return i;
              const newPrice = updatedData[i.coin] || i.price;
              return { ...i, price: newPrice };
            }),
          },
        };
      });
    }, false);
  }, [updatedData]);

  useEffect(() => {
    const newValue = rows.find((r) => r.shortName === value);
    if (
      !newValue ||
      (selected?.shortName === value && selected?.price === newValue.price)
    )
      return;

    setSelected(newValue);
    if (onCoinChange) onCoinChange(newValue);
  }, [value, rows]);

  const itemCount = useMemo(() => {
    if (!meta?.paginateHelper) return 20;
    const { pageSize = 20, currentPage, total } = meta.paginateHelper;
    const fakeTotal = pageSize * (currentPage + 1);
    if (fakeTotal > total) {
      return total;
    }
    return fakeTotal + 1;
  }, [meta]);

  const handleSelect = async (coin: CoinDataInterface) => {
    setSelecting(coin.shortName);
    if (onChange) {
      await onChange(coin);
    }
    setSelecting(undefined);
    setIsOpen(false);
    setOpen(false);
  };
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
  const handleInputValueChange = (e: any) => setInputValue(e.target.value);
  const handleClose = () => {
    setIsOpen(false);
    setOpen(false);
    setInputValue("");
    setSearchText("");
  };

  return (
    <CoinSelectView
      {...{
        handleOpen: () => setIsOpen(true),
        handleSelect,
        isOpen,
        selected,
        handleItemLoaded,
        handleLoadMore,
        rows: rows as any,
        itemCount,
        onClose: handleClose,
        inputValue,
        handleInputValueChange,
        selecting,
        isLoading,
      }}
      {...other}
    />
  );
}
