import { BankCardStatus } from "@/core/enums/profile.enums";

const BankCardStatusMap = {
  pending: BankCardStatus.Pending,
  confirmed: BankCardStatus.Accepted,
  unConfirmed: BankCardStatus.NotAccepted,
} as any;

export default function bankCardModelMapper(bankCard: any) {
  const { id, bank, number, status } = bankCard;
  return {
    image: bank.icon,
    id,
    cardNumber: number,
    origin: bank.name,
    status: BankCardStatusMap[status],
  };
}
