import { CoinFeeInterface } from "@/modules/coin/domain/entities/coin";
import FeeCardView from "./fee-card.view";

type PropTypes = {
  data?: CoinFeeInterface;
};
export default function FeeCardComponent(props: PropTypes) {
  const { data } = props;
  return <FeeCardView {...{ data }} />;
}
