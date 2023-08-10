import { useRouter } from "next/router";
import { useDispatch, useSelector, useUpdateEffect } from "@/core/hooks";
import useUser from "@/modules/auth/domain/usecases/useUser";
import { openLoginModal } from "@/modules/auth/presentation/redux";
import {
  closeInvoiceModal,
  updateInvoiceModal,
} from "@/modules/order/presentation/redux";
import InvoiceModalView from "./invoice-modal.view";
import {
  openBankCardModal,
  openUserInfoModal,
} from "@/modules/profile/presentation/redux";
import { useEffect, useMemo, useState } from "react";
import { OrderType } from "@/core/enums/order.enums";
import buyOrderRequest from "@/modules/order/domain/usecases/buyOrderRequest";
import sellOrderRequest from "@/modules/order/domain/usecases/sellOrderRequest";
import { openAlert } from "@/modules/_app/presentation/redux";

export default function InvoiceModalComponent() {
  const { invoiceModalData, invoiceModalOpen } = useSelector((s) => s.order);
  // const [accept, setAccept] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [priceLoading, setPriceLoading] = useState(false);
  const [network, setNetwork] = useState<string>();
  const dispatch = useDispatch();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (invoiceModalOpen) return;
    // setAccept(false);
    setDirty(false);
    setPriceLoading(false);
    setNetwork("");
  }, [invoiceModalOpen]);
  useEffect(() => {
    if (!invoiceModalData?.networks) return;
    if (
      invoiceModalData.networks.length === 1 &&
      !invoiceModalData.networks[0].disable
    ) {
      setNetwork(invoiceModalData.networks[0].network);
    }
  }, [invoiceModalData?.networks]);

  useUpdateEffect(() => {
    if (!invoiceModalData?.initialData || !network) return;
    const { initialData, orderType, ..._data } = invoiceModalData;
    (async () => {
      setPriceLoading(true);
      const fetch =
        invoiceModalData!.orderType === OrderType.Buy
          ? buyOrderRequest
          : sellOrderRequest;

      const { error, data } = await fetch({
        ..._data,
        ...initialData,
        network,
      });
      if (error) {
        // TODO: handleError
        return;
      }
      dispatch(updateInvoiceModal(data));
      setPriceLoading(false);
    })();
  }, [network]);

  const openLogin = () => {
    dispatch(closeInvoiceModal());
    dispatch(openLoginModal());
  };

  const onSubmit = () => {
    setDirty(true);
    if (!network) return;

    if (!invoiceModalData.trackId) return;

    const path =
      (invoiceModalData!.orderType === OrderType.Buy
        ? "/purchase/"
        : "/sell/") + invoiceModalData.trackId;
    if (invoiceModalData?.updateNeed) {
      dispatch(openUserInfoModal(path));
      dispatch(closeInvoiceModal());
      return;
    }
    router.push(path);
    dispatch(closeInvoiceModal());
  };
  const handleNetworkSelect = (network: any) => {
    if (network.disable) {
      dispatch(
        openAlert({
          message: network.description,
          skipCloseIcon: true,
          actionButtons: [
            {
              title: "متوجه شدم",
              handler: (close: any) => {
                close();
              },
            },
          ],
        })
      );
      return;
    }
    setNetwork(network.network);
  };

  return (
    <InvoiceModalView
      {...{
        onSubmit,
        user,
        openLoginModal: openLogin,
        data: invoiceModalData as any,
        open: !!invoiceModalOpen,
        onClose: () => {
          setDirty(false);
          dispatch(closeInvoiceModal());
        },
        // toggleAccept: () => setAccept((a) => !a),
        // accept,
        dirty,
        network,
        setNetwork: handleNetworkSelect,
        priceLoading,
      }}
    />
  );
}
