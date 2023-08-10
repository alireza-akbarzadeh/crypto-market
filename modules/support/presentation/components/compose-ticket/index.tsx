import { useMemo, useRef, useState } from "react";
import {
  TicketCategoryInterface,
  TicketFormValues,
} from "@/modules/support/domain/entities/ticket";
import ComposeTicketView from "./compose-ticket.view";
import OrderSelectComponent from "../order-select";
import { SimpleOrderInterface } from "@/modules/support/domain/entities/order";
import yupSchema from "@/core/helpers/yupSchema";
import * as Yup from "yup";
import createTicket from "@/modules/support/domain/usecases/createTicket";

type PropTypes = {
  category?: TicketCategoryInterface;
  onSubmit: (values: TicketFormValues) => void;
};
export default function ComposeTicketComponent(props: PropTypes) {
  const { category, onSubmit } = props;
  const formikRef = useRef<any>();
  const [ordersOpen, setOrdersOpen] = useState(false);
  const handleOpenOrders = () => setOrdersOpen(true);
  const handleSelectOrder = (order: SimpleOrderInterface) => {
    setOrdersOpen(false);
    if (!formikRef.current) return;
    formikRef.current.setFieldValue("orderId", order.orderNumber);
  };

  const schema = useMemo(() => {
    return Yup.object().shape({
      description: yupSchema.requiredDescription,
      orderId: category?.orderRequired ? yupSchema.orderId : Yup.mixed(),
      file: Yup.mixed(),
    });
  }, []);

  return (
    <>
      <ComposeTicketView
        {...{ category, onSubmit, handleOpenOrders, formikRef, schema }}
      />
      <OrderSelectComponent open={ordersOpen} onSelect={handleSelectOrder} />
    </>
  );
}
