import { ColorVariant } from "@/core/enums/theme.enums";
import {
  TransactionType,
  TransactionStatus,
} from "@/core/enums/transaction.enums";

export interface TransactionInterface {
  id: string;
  type: TransactionType;
  status: TransactionStatus;
  value: number;
  createdAt: {
    date: string;
    time: string;
  };
  checkoutDate: string;
  transactionNumber: number;
  balance: number;
  statusTitle: string;
  description?: string;
  variant: ColorVariant;
}
