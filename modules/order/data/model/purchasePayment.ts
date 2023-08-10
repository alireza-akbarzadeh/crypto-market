import { PurchasePaymentResult } from "../../domain/entities/payment";

export default function purchasePaymentModelMapper(
  data: any
): PurchasePaymentResult | undefined {
  if (!data) return;
  const {
    availableBalance,
    orderAmount,
    otp,
    payment,
    remainingAmount,
    trackId,
  } = data;
  return {
    balance: availableBalance,
    total: orderAmount,
    otp,
    link: payment.link,
    remaining: remainingAmount,
    trackId,
  };
}
