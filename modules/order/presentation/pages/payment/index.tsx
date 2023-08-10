import { useNotFound } from "@/core/hooks";
import usePaymentOrderResult from "@/modules/order/domain/usecases/usePaymentOrderResult";

import { useEffect } from "react";
import PaymentView from "./payment.view";

type PropTypes = { token: string; status: 0 | 1 };
export default function PaymentPage(props: PropTypes) {
  const { token } = props;
  const { data, error } = usePaymentOrderResult(token);
  const toNotFound = useNotFound();

  useEffect(() => {
    if (error) {
      toNotFound();
    }
  }, [error]);

  return <PaymentView {...{ data, token, error }} />;
}
