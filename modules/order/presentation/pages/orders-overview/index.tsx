import { OrderDateSpan, OrderType } from "@/core/enums/order.enums";
import useUser from "@/modules/auth/domain/usecases/useUser";
import { useState } from "react";
import OrdersOverviewView from "./orders-overview.view";

type PropTypes = {};
export default function OrdersOverviewPage(props: PropTypes) {
  const [orderType, setOrderType] = useState(OrderType.Buy);
  const [dateSpan, setDateSpan] = useState(OrderDateSpan.CurrentMonth);
  const { user } = useUser();

  return (
    <OrdersOverviewView
      {...{ orderType, setOrderType, dateSpan, setDateSpan, user }}
    />
  );
}
