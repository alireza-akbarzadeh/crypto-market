import { OrderInterface } from "@/modules/order/domain/entities/order";
import OrderCardView from "./order-card.view";

type PropTypes = {
  data?: OrderInterface;
  onClick: () => void;
};
export default function OrderCardComponent(props: PropTypes) {
  return <OrderCardView {...props} />;
}
