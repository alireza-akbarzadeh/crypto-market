import { WalletAddressInterface } from "@/modules/profile/domain/entities/wallet-address";
import WalletAddressCardSelectableView from "./wallet-address-card-selectable.view";

type PropTypes = {
  data: WalletAddressInterface;
  selected?: boolean;
  onSelect?: () => void;
};
export default function WalletAddressCardSelectableComponent(props: PropTypes) {
  return <WalletAddressCardSelectableView {...props} />;
}
