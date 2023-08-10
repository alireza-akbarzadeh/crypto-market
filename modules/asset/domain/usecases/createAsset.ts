import { createAssetDS } from "../../data/datasources/asset.datasource";
import { CreateAssetFormValues } from "./../entities/asset";

export default async function createAsset(model: CreateAssetFormValues) {
  const { isSell, amount, coin, price } = model;
  const { message, error } = await createAssetDS({
    side: isSell ? "sell" : "buy",
    amount,
    price,
    currency_id: coin.id,
  });
  return { data: message, error };
}
