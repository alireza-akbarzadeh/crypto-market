import { OrderType } from "@/core/enums/order.enums";
export interface SimpleOrderInterface {
  id: string;
  side: OrderType;
  amount: number;
  unit: string;
  color: string;
  orderNumber: number;
  createdAt: string;
  title: string;
}
