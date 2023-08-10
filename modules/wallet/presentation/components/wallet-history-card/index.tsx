import { useIsDesktopSize } from "@/core/hooks";
import { TransactionInterface } from "@/modules/wallet/domain/entities/transaction";
import { useState } from "react";
import WalletHistoryCardView from "./wallet-history-card.view";

type PropTypes = {
  data?: TransactionInterface;
  onClick: () => void;
  isDesktopSize: boolean;
  isFirst?: boolean;
};
export default function WalletHistoryCardComponent(props: PropTypes) {
  const { data, onClick, isDesktopSize, isFirst } = props;
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    if (!data) return;
    setOpen(!open);
    onClick();
  };
  return (
    <WalletHistoryCardView
      {...{ data, open, isDesktopSize, isFirst }}
      onClick={handleClick}
    />
  );
}
