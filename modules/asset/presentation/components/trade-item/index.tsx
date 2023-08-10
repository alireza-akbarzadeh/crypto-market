import { TradeInterface } from "@/modules/asset/domain/entities/asset";
import TradeItemView from "./trade-item.view";

type PropTypes = {
  data?: TradeInterface;
  onEdit?: (data: TradeInterface) => void;
};
export default function TradeItemComponent(props: PropTypes) {
  const { data, onEdit } = props;
  const handleClick = () => {
    if (data && onEdit) {
      onEdit(data);
    }
  };
  return <TradeItemView data={data} onEdit={handleClick} />;
}
