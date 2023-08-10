import { useIsDesktopSize } from "@/core/hooks";
import { TransactionInterface } from "@/modules/wallet/domain/entities/transaction";
import { useState } from "react";
import WalletHistoryView from "./wallet-history.view";

type PropTypes = {};
export default function WalletHistoryComponent(props: PropTypes) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [details, setDetails] = useState<TransactionInterface>();
  const isDesktopSize = useIsDesktopSize();

  const handleOpen = (val: TransactionInterface) => {
    setDetails(val);
    setDetailsOpen(true);
  };
  const closeDetails = () => setDetailsOpen(false);

  return (
    <WalletHistoryView
      {...{
        setDetails,
        closeDetails,
        details,
        detailsOpen,
        handleOpen,
        isDesktopSize,
      }}
    />
  );
}
