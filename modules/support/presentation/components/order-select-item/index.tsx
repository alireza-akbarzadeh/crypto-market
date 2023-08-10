import { SimpleOrderInterface } from "@/modules/support/domain/entities/order";
import OrderSelectItemView from "./order-select-item.view";

type PropTypes = {
  data?: SimpleOrderInterface;
  onSelect: (data: SimpleOrderInterface) => void;
};
export default function OrderSelectItemComponent(props: PropTypes) {
  const { onSelect, data } = props;

  const handleClick = () => {
    if (data) onSelect(data);
  };

  return <OrderSelectItemView {...props} onClick={handleClick} />;
}
