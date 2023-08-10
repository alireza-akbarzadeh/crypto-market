import { useRedirectNotUser } from "@/core/hooks";
import useSellSteps from "@/modules/order/domain/usecases/useSellSteps";
import { useRouter } from "next/router";
import { useState } from "react";
import SellView, { Steps } from "./sell.view";

type PropTypes = {};
export default function SellPage(props: PropTypes) {
  const router = useRouter();
  const [state, setState] = useState<Steps>(Steps.Rules);
  const { data } = useSellSteps({ revalidateOnMount: true });
  const [ibanId, setIbanId] = useState();

  const onNext = (data?: any) => {
    if (state === Steps.Sending) {
      router.replace("/orders");
    }
    if (state === Steps.Type) {
      setIbanId(data);
    }
    setState((s) => s + 1);
  };
  const onSubmit = () => {};
  const onPrev = () => {
    if (state === Steps.Rules) {
      router.replace("/");
    }
    setState((s) => s - 1);
  };
  useRedirectNotUser();
  return <SellView {...{ onSubmit, onNext, onPrev, state, data, ibanId }} />;
}
