import { deleteAssetDS } from "../../data/datasources/asset.datasource";

export default async function deleteAsset(id: string) {
  const { message, error } = await deleteAssetDS(id);
  return { data: message, error };
}
