import { OrderType } from "@/core/enums/order.enums";
import { useDeepCompareEffect } from "@/core/hooks";
import { OrderStatus } from "@/modules/order/domain/entities/order";
import useAppInitials from "@/modules/_app/domain/usecases/useAppInitials";
import { useState } from "react";
import { FilterType } from "../../pages/orders/orders.view";
import OrderFilterModalView from "./order-filter-modal.view";

type PropTypes = {
  open: boolean;
  onClose: () => void;
  orderType?: OrderType;
  orderStatus: OrderStatus["id"][];
  onChange: (status: OrderStatus["id"][], type?: OrderType) => void;
  filterType?: FilterType;
};
export default function OrderFilterModalComponent(props: PropTypes) {
  const { open, onClose, orderType, orderStatus, onChange, filterType } = props;
  const [status, setStatus] = useState<OrderStatus["id"][]>([]);
  const [type, setType] = useState<OrderType>();
  const { data: appInitials } = useAppInitials();

  useDeepCompareEffect(() => {
    setStatus(orderStatus);
    setType(orderType);
  }, [orderType, orderStatus, open]);

  const handleStatusChange = (status: OrderStatus["id"]) => {
    setStatus((list) => {
      const newList = list.filter((s) => s !== status);
      if (newList.length !== list.length) return newList;
      return [...newList, status];
    });
  };
  const handleTypeChange = (type: OrderType | "all") => {
    if (type === "all") return setType(undefined);
    setType(type);
  };
  const submit = () => {
    onChange(status, type);
    onClose();
  };

  return (
    <OrderFilterModalView
      {...{
        open,
        onClose,
        handleStatusChange,
        handleTypeChange,
        type,
        status,
        submit,
        filterType,
        orderStatuses: appInitials?.filters.orders || [],
      }}
    />
  );
}
