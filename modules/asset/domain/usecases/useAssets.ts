import { DefaultFetchConfig } from "./../../../../core/constants/types";
import { AssetInterface } from "./../entities/asset";
import { GetPaginateHookType } from "@/core/hooks/usePaginateHelpers";
import { useAssetsDS } from "../../data/datasources/asset.datasource";
import assetModelMapper from "../../data/model/asset";

const useAssets: GetPaginateHookType<AssetInterface> = (
  config?: DefaultFetchConfig
) => {
  const { rows, meta, setSize, size, isLoading, isValidating, mutate } =
    useAssetsDS<AssetInterface>(assetModelMapper, config);

  return {
    rows,
    meta,
    size,
    setSize,
    isLoading,
    mutate,
    isValidating,
  };
};
export default useAssets;
