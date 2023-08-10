import { CoinDataInterface } from "@/modules/coin/domain/entities/coin";
import { useMemo } from "react";
import CoinListItemView from "./coin-list-item.view";

type PropTypes = {
  style: any;
  coin: CoinDataInterface;

  handleSelect: (coin: CoinDataInterface) => void;
  isSell: boolean;
  selected?: CoinDataInterface;
  skipPrice?: boolean;
  selecting?: string;
};
export default function CoinListItemComponent(props: PropTypes) {
  const { coin, style, handleSelect, isSell, selected, skipPrice, selecting } =
    props;

  const isSelected = useMemo(() => {
    if (!selected || !coin) return false;
    return selected.shortName === coin.shortName;
  }, [selected, coin]);

  return (
    <CoinListItemView
      {...{
        isSell,
        isSelected,
        handleSelect,
        coin,
        style,
        skipPrice,
        selecting,
      }}
    />
  );
}
