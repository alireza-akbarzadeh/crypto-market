import { useRedirectNotUser } from "@/core/hooks";
import { PurchaseStepsData } from "@/modules/order/domain/entities/order";
import usePurchaseSteps from "@/modules/order/domain/usecases/usePurchaseSteps";
import { WalletAddressInterface } from "@/modules/profile/domain/entities/wallet-address";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PurchaseView, { Steps } from "./purchase.view";

type PropTypes = {};
export default function PurchasePage(props: PropTypes) {
  const router = useRouter();
  const [state, setState] = useState<Steps>(Steps.Rules);
  const { data } = usePurchaseSteps({ revalidateOnMount: true });
  const [address, setAddress] = useState<WalletAddressInterface>();

  const onNext = () => {
    if (!data) return;

    if (state === Steps.PaymentMethod) {
      return;
    }
    setState((s) => s + 1);
  };
  const onPrev = () => {
    if (state === Steps.Rules) {
      router.replace("/");
    }
    setState((s) => s - 1);
  };
  useRedirectNotUser();
  return (
    <PurchaseView
      {...{
        state,
        onNext,
        onPrev,
        data,
        address,
        setAddress: (a) => setAddress(a),
      }}
    />
  );
}
