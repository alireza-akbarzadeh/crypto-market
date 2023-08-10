import { AssetSummeryInterface } from "./../../domain/entities/asset";

export default function assetSummeryModelMapper(
  data: any
): AssetSummeryInterface | undefined {
  if (!data) return;
  const { totalAssetAmount, totalAssetProfit, pie } = data;

  return {
    totalAssetAmount,
    totalAssetProfit,
    pie: pie.map(({ coin, faName, color, totalAmount }: any) => ({
      color,
      faName,
      shortName: coin,
      value: Math.round(totalAmount),
    })),
  };
}
