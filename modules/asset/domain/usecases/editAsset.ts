import { useRouter } from "next/router";
import { editAssetDS } from "../../data/datasources/asset.datasource";
import { CreateAssetFormValues } from "../entities/asset";

export default async function editAsset(
  id: string,
  model: CreateAssetFormValues
) {
  const { isSell, amount, coin, price } = model;
  const { message, error } = await editAssetDS(id, {
    side: isSell ? "sell" : "buy",
    amount,
    price,
    currency_id: coin.id,
  });
  return { data: message, error };
}
