import { useRouter } from "next/router";
import { useAssetItemsDS } from "../../data/datasources/asset.datasource";
import assetInfoModelMapper from "../../data/model/assetInfo";

export function useAssetItems() {
  const router = useRouter();
  const id = typeof router.query.id === "string" ? router.query.id : undefined;

  const { data, error, isValidating, mutate } = useAssetItemsDS(id);

  return {
    data: assetInfoModelMapper(data?.result),
    error: data?.error || error,
    isValidating,
    mutate,
  };
}
