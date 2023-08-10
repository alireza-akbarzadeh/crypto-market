export interface CoinDataInterface {
  id: string;
  faName: string;
  enName: string;
  shortName: string;
  price: number;
  marketCapacity: number;
  sellPrice: number;
  buyPrice: number;
  changes: number;
  favorite?: boolean;
  chart: any;
  icon: string;
  usdSell: number;
  usdBuy: number;
  decimal: number;
}
export interface CoinFeeInterface {
  currency: {
    shortName: string;
    enName: string;
    faName: string;
    icon: string;
  };
  fees: {
    network: string;
    fee: number;
    coinFee: number;
  }[];
}
