import bankCardModelMapper from "@/modules/profile/data/model/bankCard";
import ibanModelMapper from "@/modules/profile/data/model/iban";
import walletBalanceModelMapper from "./walletBalance";

export default function walletModelMapper(data: any) {
  const { ibans, cards, balance } = data;
  return {
    ibans: ibans.map(ibanModelMapper),
    cards: cards.map(bankCardModelMapper),
    balance: walletBalanceModelMapper(balance),
  };
}
