import PurchasingInvoiceView from "./purchasing-invoice.view";
import { useIsMobileSize, useSelector } from "@/core/hooks";
import usePurchaseInvoice from "@/modules/order/domain/usecases/usePurchaseInvoice";
import { WalletAddressInterface } from "@/modules/profile/domain/entities/wallet-address";

type PropTypes = {
  onNext: () => void;
  onPrev: () => void;
  address: WalletAddressInterface;
};
export default function PurchasingInvoiceComponent(props: PropTypes) {
  const { onNext, onPrev, address } = props;
  const { data, error, loading } = usePurchaseInvoice({
    revalidateOnMount: true,
  });
  const { invoiceModalData } = useSelector((s) => s.order);

  const isMobileSize = useIsMobileSize();
  const handlePrev = () => onPrev();
  const handleNext = () => {
    if (!data) return;
    onNext();
  };

  return (
    <PurchasingInvoiceView
      {...{
        initialData: invoiceModalData,
        handlePrev,
        handleNext,
        isMobileSize,
        data,
        loading,
        error,
        address,
      }}
    />
  );
}
