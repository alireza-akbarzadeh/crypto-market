import { useErrorHandler } from "@/core/hooks";
import { OrderInterface } from "@/modules/order/domain/entities/order";
import changeAddressWallet from "@/modules/order/domain/usecases/changeAddressWallet";
import useOrderDetails from "@/modules/order/domain/usecases/useOrderDetails";
import { WalletAddressInterface } from "@/modules/profile/domain/entities/wallet-address";
import ChangeWalletModalComponent from "@/modules/wallet/presentation/components/change-wallet-modal";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import OrderDetailsModalView from "./order-details-modal.view";

type PropTypes = {
  open: boolean;
  onClose: () => void;
  data?: OrderInterface;
};
export default function OrderDetailsModalComponent(props: PropTypes) {
  const { open, onClose, data: _data } = props;
  const { data, mutate } = useOrderDetails(_data?.id);
  const [currencyChangeOpen, setCurrencyChangeOpen] = useState(false);
  const errorHandler = useErrorHandler();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (_data?.id) {
      mutate();
    }
  }, [_data?.id]);

  const openChangeWallet = () => {
    setCurrencyChangeOpen(true);
  };
  const onChangeWallet = async (wallet?: WalletAddressInterface) => {
    if (!data || !wallet) return;
    const { data: result, error } = await changeAddressWallet(
      data.id,
      wallet.id
    );
    if (error) return errorHandler(error);
    enqueueSnackbar(result, { variant: "success" });
    setCurrencyChangeOpen(false);
    mutate();
  };

  return (
    <>
      <OrderDetailsModalView
        {...{ open, onClose, data: data || _data, openChangeWallet }}
      />
      <ChangeWalletModalComponent
        open={currencyChangeOpen}
        onClose={() => setCurrencyChangeOpen(false)}
        coinId={currencyChangeOpen ? data?.currency.id : undefined}
        network={currencyChangeOpen ? data?.network : undefined}
        onSubmit={onChangeWallet}
      />
    </>
  );
}
