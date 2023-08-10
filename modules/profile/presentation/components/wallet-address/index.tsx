import { useDispatch, useErrorHandler, useIsDesktopSize } from "@/core/hooks";
import { WalletAddressInterface } from "@/modules/profile/domain/entities/wallet-address";
import deleteWalletAddress from "@/modules/wallet/domain/usecases/deleteAddress";
import useWalletAddressList from "@/modules/wallet/domain/usecases/useWalletAddressList";
import { openAlert } from "@/modules/_app/presentation/redux";
import { useSnackbar } from "notistack";
import { useState } from "react";
import WalletAddressModalComponent from "../wallet-address-modal";
import WalletAddressView from "./wallet-address.view";

type PropTypes = {
  // isDesktopSize: boolean;
};
export default function WalletAddressComponent(props: PropTypes) {
  const isDesktopSize = useIsDesktopSize();
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const { mutate } = useWalletAddressList();
  const errorHandler = useErrorHandler();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteAddress = (address: WalletAddressInterface) => {
    dispatch(
      openAlert({
        message: "آیا از حذف این آدرس ارزی اطمینان دارید؟",
        variant: "delete",
        skipCloseIcon: true,
        actionButtons: [
          {
            title: "خیر",
            variant: "outlined",
            handler: (close: any) => {
              close();
            },
          },
          {
            title: "بله",
            handler: async (close: any) => {
              const { error, data } = await deleteWalletAddress(address.id);
              close();
              if (error) return errorHandler(error);
              mutate();
              enqueueSnackbar(data, { variant: "success" });
            },
          },
        ],
      })
    );
  };
  return (
    <>
      <WalletAddressView
        {...{
          isDesktopSize,
          openAddressModal: () => setModalOpen(true),
          deleteAddress: handleDeleteAddress,
        }}
      />
      <WalletAddressModalComponent
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        mutate={mutate}
      />
    </>
  );
}
