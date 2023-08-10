import { WalletAddressInterface } from "@/modules/profile/domain/entities/wallet-address";
import WalletAddressModalComponent from "@/modules/profile/presentation/components/wallet-address-modal";
import { NetworkType } from "@/modules/wallet/domain/entities/coin";
import { useWalletAddressFilterList } from "@/modules/wallet/domain/usecases/useWalletAddressFilterList";
import { useEffect, useState } from "react";
import ChangeWalletModalView from "./change-wallet-modal.view";

type PropTypes = {
  open: boolean;
  onClose: () => void;
  coinId?: string;
  network?: NetworkType;
  onSubmit: (wallet?: WalletAddressInterface) => void;
};
export default function ChangeWalletModalComponent(props: PropTypes) {
  const { open, onClose, coinId, network, onSubmit } = props;
  const [selected, setSelected] = useState<WalletAddressInterface>();
  const [createAddressOpen, setCreateAddressOpen] = useState(false);
  const { data, isValidating, mutate } = useWalletAddressFilterList(
    coinId,
    network?.id
  );
  useEffect(() => {
    if (!open) return;
    mutate();
  }, [open]);

  return (
    <>
      <ChangeWalletModalView
        {...{
          open,
          onClose,
          data,
          loading: isValidating,
          openAddressModal: () => setCreateAddressOpen(true),
          selectAddress: (address) => setSelected(address),
          selected,
          submit: () => onSubmit(selected),
        }}
      />

      <WalletAddressModalComponent
        open={createAddressOpen}
        onClose={() => setCreateAddressOpen(false)}
        data={network && coinId ? { coinId, network } : undefined}
        mutate={mutate}
      />
    </>
  );
}
