import { PaymentType } from "@/core/enums/order.enums";
import { useErrorHandler } from "@/core/hooks";
import useUser from "@/modules/auth/domain/usecases/useUser";
import { PurchasePaymentResult } from "@/modules/order/domain/entities/payment";
import purchasePayment from "@/modules/order/domain/usecases/purchasePayment";
import purchaseSubmit from "@/modules/order/domain/usecases/purchaseSubmit";
import usePurchaseInvoice from "@/modules/order/domain/usecases/usePurchaseInvoice";
import usePurchaseSteps from "@/modules/order/domain/usecases/usePurchaseSteps";
import { BankCardInterface } from "@/modules/profile/domain/entities/bank-card";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import PaymentConfirmModalComponent from "../payment-confirm-modal";
import SelectBankCardModalComponent from "../select-bank-card-modal";
import PurchasingPaymentView from "./purchasing-payment.view";

type PropTypes = {
  onNext: () => void;
  onPrev: () => void;
  addressId?: string;
};
export default function PurchasingPaymentComponent(props: PropTypes) {
  const { onPrev, addressId } = props;
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmData, setConfirmData] = useState<PurchasePaymentResult>();
  const { data: stepsData } = usePurchaseSteps();
  const { data: purchaseInvoiceData } = usePurchaseInvoice();
  const { user } = useUser();
  const data: any = useMemo(() => {
    if (!stepsData?.balance || !purchaseInvoiceData?.totalPrice) return;
    return {
      balance: stepsData.balance,
      totalPrice: purchaseInvoiceData.totalPrice,
    };
  }, [stepsData, purchaseInvoiceData]);
  const [cardSelectOpen, setCardSelectOpen] = useState(false);
  const router = useRouter();
  const errorHandler = useErrorHandler();
  const [selectedCard, setSelectedCard] = useState<BankCardInterface>();

  const orderId = useMemo(() => {
    if (!data || typeof router.query?.id !== "string") return;
    return router.query?.id;
  }, [router.query?.id]);

  const handleNext = async () => {
    if (!orderId) return;
    const { error, data: res } = await purchasePayment(orderId);
    if (error) {
      return errorHandler(error);
    }
    setConfirmData(res);
    if (res?.remaining) {
      setCardSelectOpen(true);
      return;
    }
    setConfirmOpen(true);
    // onNext();
  };
  const handlePrev = () => onPrev();
  const onCardSelect = async (card: BankCardInterface) => {
    setSelectedCard(card);
    setCardSelectOpen(false);
    setConfirmOpen(true);
  };

  const onConfirm = async (values: any) => {
    if (!confirmData || !orderId || !addressId) return;
    const { data: res, error } = await purchaseSubmit(orderId, {
      addressId,
      code: values.code,
      trackId: confirmData.trackId,
      cardId: selectedCard?.id,
      phoneNumber: user!.phoneNumber,
    });
    if (error || !res) {
      return errorHandler(error);
    }
    if (res.link) {
      router.replace(res.link);
      return;
    }
    router.replace("/order-creation/" + res.trackId);
  };

  return (
    <>
      <PurchasingPaymentView
        {...{ handlePrev, handleNext, user: user!, data }}
      />
      <PaymentConfirmModalComponent
        {...{
          onSubmit: onConfirm,
          open: confirmOpen,
          data: confirmData,
          onClose: () => setConfirmOpen(false),
        }}
      />
      <SelectBankCardModalComponent
        {...{
          onSelect: onCardSelect,
          selected: selectedCard,
          onClose: () => setCardSelectOpen(false),
          open: cardSelectOpen,
        }}
      />
    </>
  );
}
