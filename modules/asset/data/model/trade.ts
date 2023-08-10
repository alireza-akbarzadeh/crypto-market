import { AssetInterface } from "./../../domain/entities/asset";
import { TradeInterface } from "../../domain/entities/asset";
import assetModelMapper from "./asset";

export default function tradeModelMapper(
  data: any
): TradeInterface | undefined {
  if (!data) return;
  return {
    ...(assetModelMapper(data) as AssetInterface),
    isSell: data.side === "sell",
  };
}
