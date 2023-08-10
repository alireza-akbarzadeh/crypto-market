import { usePaymentOrderResultDS } from "../../data/datasources/order.datasource";
import paymentOrderResultModelMapper from "../../data/model/paymentOrderResult";

export default function usePaymentOrderResult(id?: string) {
  const { data, error, isValidating } = usePaymentOrderResultDS(id);

  return {
    data: paymentOrderResultModelMapper(data?.result),
    error: data?.error || error,
    isValidating,
  };
}
