import { GetAvailableAssetBalanceDS } from "../../data/datasources/asset.datasource";

export async function GetAvailableAssetBalance(coinId: string) {
  const { result, error } = await GetAvailableAssetBalanceDS(coinId);

  if (error) return { error };
  return { data: result?.availableAssetBalance };
}
