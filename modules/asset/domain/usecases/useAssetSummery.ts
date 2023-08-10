import { useSelector, useUpdateEffect } from "@/core/hooks";
import { useMemo } from "react";
import { useAssetSummeryDS } from "../../data/datasources/asset.datasource";
import assetSummeryModelMapper from "../../data/model/assetSummery";

export function useAssetSummery() {
  const { data, error, isValidating, mutate } = useAssetSummeryDS();

  return {
    data: useMemo(() => assetSummeryModelMapper(data?.result), [data?.result]),
    error: data?.error || error,
    isValidating,
    mutate,
  };
}
