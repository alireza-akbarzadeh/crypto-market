import { useIsDesktopSize } from "@/core/hooks";
import { TransactionInterface } from "@/modules/wallet/domain/entities/transaction";
import WalletHistoryDetailsView from "./wallet-history-details.view";

type PropTypes = {
  open: boolean;
  onClose: () => void;
  data?: TransactionInterface;
};
export default function WalletHistoryDetailsComponent(props: PropTypes) {
  const isDesktopSize = useIsDesktopSize();
  return <WalletHistoryDetailsView {...props} {...{ isDesktopSize }} />;
}
