import { PaymentOrderResult } from "./../../domain/entities/payment";
export default function paymentOrderResultModelMapper(
  data: any
): PaymentOrderResult | undefined {
  if (!data) return;
  const { success, amount, variant, title, description, link } = data;
  return { success, amount, variant, title, description, link };
}
