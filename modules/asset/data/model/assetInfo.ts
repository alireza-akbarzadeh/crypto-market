import tradeModelMapper from "./trade";

export default function assetInfoModelMapper(data: any) {
  if (!data) return undefined;
  const { asset, assets } = data;
  return {
    asset: tradeModelMapper(asset)!,
    assets: assets.map(tradeModelMapper),
  };
}
