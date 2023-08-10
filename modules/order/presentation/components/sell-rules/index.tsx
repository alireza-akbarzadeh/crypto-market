import { SellStepsData } from "@/modules/order/domain/entities/order";
import SellRulesView from "./sell-rules.view";

type PropTypes = {
  onNext: () => void;
  onPrev: () => void;
  data: SellStepsData;
};
export default function SellRulesComponent(props: PropTypes) {
  const { onNext, onPrev, data } = props;
  // const [accepted, setAccepted] = useState(true);
  // const [dirty, setDirty] = useState(false);

  const handleNext = () => {
    // if (!accepted) return setDirty(true);
    onNext();
  };
  const handlePrev = () => onPrev();
  // const toggleAccepted = () => {
  //   setAccepted((a) => !a);
  // };
  return (
    <SellRulesView
      {...{
        // accepted, toggleAccepted, dirty,
        handlePrev,
        handleNext,
        data,
      }}
    />
  );
}
