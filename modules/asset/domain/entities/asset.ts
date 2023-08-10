import { CoinDataInterface } from "@/modules/coin/domain/entities/coin";

export type AssetSummeryPie = {
  faName: string;
  shortName: string;
  value: number;
  color: string;
  icon?: string;
}[];
export interface AssetSummeryInterface {
  totalAssetAmount: number;
  totalAssetProfit: number;
  pie: AssetSummeryPie;
}
export interface AssetInterface {
  id: string;
  currency: {
    id: string;
    shortName: string;
    faName: string;
    enName: string;
    icon: string;
  };
  totalCost: number;
  totalAmount: number;
  currentValue: number;
  profit: {
    amount: number;
    percentage: number;
  };
  allowSideEdit?: boolean;
}
export interface TradeInterface extends AssetInterface {
  isSell: boolean;
}

export interface CreateAssetFormValues {
  isSell: boolean;
  coin: CoinDataInterface;
  amount: number;
  price: number;
}
export interface AssetItemsInterface {
  asset: TradeInterface;
  assets: TradeInterface[];
}
