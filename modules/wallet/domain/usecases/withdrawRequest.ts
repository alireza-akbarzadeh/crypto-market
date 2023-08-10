import { withdrawRequestDS } from "../../data/datasources/wallet.datasource";
import { WalletWithdrawFormValues } from "../entities/form-values";

export async function withdrawRequest(model: WalletWithdrawFormValues) {
  const { success, result, error } = await withdrawRequestDS({
    rial_account_id: model.iban,
    amount: model.amount,
  });

  if (!success) return { error };
  const { amount, checkoutAt, name, trackId } = result;

  return {
    data: {
      amount,
      date: checkoutAt,
      name,
      trackId,
    },
  };
}
