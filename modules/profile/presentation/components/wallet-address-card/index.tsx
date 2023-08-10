import { useCopyToClipboard } from "@/core/hooks";
import { WalletAddressInterface } from "@/modules/profile/domain/entities/wallet-address";
import WalletAddressCardView from "./wallet-address-card.view";

type PropTypes = {
  isDesktopSize: boolean;
  data?: WalletAddressInterface;
  deleteAddress: (data: WalletAddressInterface) => void;
} & React.DetailedHTMLProps<any, any>;
export default function WalletAddressCardComponent(props: PropTypes) {
  const copyToClipboard = useCopyToClipboard();
  const handleDelete = () => {
    if (!props.data) return;
    props.deleteAddress(props.data);
  };
  return (
    <WalletAddressCardView
      {...props}
      {...{ copyToClipboard, deleteAddress: handleDelete }}
    />
  );
}
