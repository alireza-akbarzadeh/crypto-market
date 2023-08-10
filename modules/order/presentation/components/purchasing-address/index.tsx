import useUser from "@/modules/auth/domain/usecases/useUser";
import { PurchaseStepsData } from "@/modules/order/domain/entities/order";
import usePurchaseSteps from "@/modules/order/domain/usecases/usePurchaseSteps";
import { WalletAddressInterface } from "@/modules/profile/domain/entities/wallet-address";
import WalletAddressModalComponent from "@/modules/profile/presentation/components/wallet-address-modal";
import { useEffect, useState } from "react";
import PurchasingAddressView from "./purchasing-address.view";

type PropTypes = {
  onNext: (selected: WalletAddressInterface) => void;
  onPrev: () => void;
  address?: WalletAddressInterface;
  setAddress: (address?: WalletAddressInterface) => void;
};
export default function PurchasingAddressComponent(props: PropTypes) {
  const { onNext, onPrev, address, setAddress } = props;
  const { data, mutate, loading } = usePurchaseSteps();

  const { user } = useUser();
  // const [address, setAddress] = useState<WalletAddressInterface>();
  const [dirty, setDirty] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenAddressModal = () => {
    setModalOpen(true);
  };
  const handleNext = () => {
    setDirty(true);
    if (!data!.addresses.length) return handleOpenAddressModal();
    if (!address) return;
    onNext(address);
  };
  const handlePrev = () => onPrev();
  const selectAddress = (a: WalletAddressInterface) => {
    if (address?.id === a.id) return setAddress(undefined);
    setAddress(a);
  };

  useEffect(() => {
    return () => {
      setModalOpen(false);
    };
  }, []);

  return (
    <>
      <PurchasingAddressView
        {...{
          user,
          selectAddress,
          selected: address,
          openAddressModal: handleOpenAddressModal,
          data: data!.addresses,
          handleNext,
          handlePrev,
          dirty,
          loading,
        }}
      />
      <WalletAddressModalComponent
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        data={data!.cart}
        mutate={mutate}
      />
    </>
  );
}
