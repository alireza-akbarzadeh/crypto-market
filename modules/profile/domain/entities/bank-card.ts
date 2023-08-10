import { BankCardStatus } from "@/core/enums/profile.enums";

export interface BankCardInterface {
  id: string;
  image: string;
  origin: string;
  cardNumber: string;
  status: BankCardStatus;
}
export interface BankCardInquiry {
  cardNumber: string;
  name: string;
  trackId: string;
  origin: string;
}
