import { PurchaseStepsData } from "@/modules/order/domain/entities/order";
import { useState } from "react";
import PurchasingRulesView from "./purchasing-rules.view";

type PropTypes = {
  onNext: () => void;
  onPrev: () => void;
  data: PurchaseStepsData;
};
export default function PurchasingRulesComponent(props: PropTypes) {
  const { onNext, onPrev, data } = props;
  const [accepted, setAccepted] = useState(true);
  const [dirty, setDirty] = useState(false);

  const handleNext = () => {
    if (!accepted) return setDirty(true);
    onNext();
  };
  const handlePrev = () => onPrev();
  const toggleAccepted = () => {
    setAccepted((a) => !a);
  };
  return (
    <PurchasingRulesView
      {...{ accepted, toggleAccepted, handlePrev, handleNext, dirty, data }}
    />
  );
}
