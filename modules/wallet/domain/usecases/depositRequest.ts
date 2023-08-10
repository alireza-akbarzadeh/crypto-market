import { depositRequestDS } from "../../data/datasources/wallet.datasource";
import { WalletDepositFormValues } from "../entities/form-values";

export async function depositRequest(model: WalletDepositFormValues) {
  const { success, result, error } = await depositRequestDS({
    rial_account_id: model.card,
    amount: model.amount,
  });

  if (!success) return { error };
  const { link } = result;

  return {
    data: link,
  };
}
