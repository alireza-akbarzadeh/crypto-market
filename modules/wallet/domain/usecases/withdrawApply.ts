import { withdrawApplyDS } from "../../data/datasources/wallet.datasource";
import { WalletApplyModel } from "../entities/wallet";

export async function withdrawApply(model: WalletApplyModel) {
  const { success, message, error } = await withdrawApplyDS({
    code: model.code,
    track_id: model.trackId,
  });

  if (!success) return { error };

  return {
    data: message,
  };
}
