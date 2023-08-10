import { purchasePaymentDS } from "../../data/datasources/order.datasource";
import purchasePaymentModelMapper from "../../data/model/purchasePayment";

export default async function purchasePayment(id: string) {
  const { result, error } = await purchasePaymentDS(id);

  if (error) return { error };
  return {
    data: purchasePaymentModelMapper(result),
  };
}
