import { OrderType } from "@/core/enums/order.enums";
import {
  OrderInterface,
  OrderStatus,
} from "@/modules/order/domain/entities/order";
import OrderListView from "./order-list.view";

type PropTypes = {
  openOrderModal: (data: OrderInterface) => void;
  status: OrderStatus["id"][];
  type?: OrderType;
};
export default function OrderListComponent(props: PropTypes) {
  const { openOrderModal, status, type } = props;
  return <OrderListView {...{ openOrderModal, status, type }} />;
}
