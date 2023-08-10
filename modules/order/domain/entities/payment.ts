export interface PaymentOrderResult {
  success: boolean;
  amount: number;
  variant: "success" | "error";
  title: string;
  description: string;
  link: string;
}

export interface PurchasePaymentResult {
  balance: number;
  total: number;
  otp: boolean;
  link: string;
  remaining: number;
  trackId: string;
}
