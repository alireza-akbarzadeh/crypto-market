import { NetworkType } from "./../../../wallet/domain/entities/coin";

import { WalletAddressInterface } from "@/modules/profile/domain/entities/wallet-address";
import { WalletBalanceInterface } from "@/modules/wallet/domain/entities/wallet";
import { OrderType } from "@/core/enums/order.enums";
import { ColorVariant } from "@/core/enums/theme.enums";
import { AssetSummeryPie } from "@/modules/asset/domain/entities/asset";
export interface OrderStatus {
  id: string;
  title: string;
}

export type OrderFlowInterface = { title: string; isComplete: boolean }[];

export type OrderInterface = {
  id: string;
  status: {
    title: string;
    variant: ColorVariant;
  };
  amount: number;
  price: number;
  orderNumber: string;
  currencyPrice: number;
  usdtPrice: number;
  checkoutAt: string;
  networkConfirmationAt: string;
  txId: string;
  note: string;
  createdAt: {
    date: string;
    time: string;
  };
  flow: OrderFlowInterface;
  network: NetworkType;
  changeAddressPermission: boolean;
  currency: {
    shortName: string;
    enName: string;
    faName: string;
    icon: string;
    id: string;
  };
  checkoutType: string;
} & (
  | {
      type: OrderType.Buy;
      walletAddress: string;
      ibanNumber: null;
    }
  | {
      type: OrderType.Sell;
      ibanNumber: string;
      walletAddress: null;
    }
);

export interface BuyOrderRequestData {
  amount: number;
  checkoutTime: string;
  checkoutTimes?: {
    title: string;
    items: {
      name: string;
      value: string;
    }[];
  };
  convertFee?: number;
  currency: {
    coin: string;
    faName: string;
    icon: string;
  };
  description: string;
  gatewayFee: number;
  networkFee?: number;
  networkFeeIrt?: number;
  networks: [
    {
      network: string;
      name: string;
      disable: boolean;
      description?: string;
      buyNote: string;
      sellNote: string;
    }
  ];
  price: number;
  totalPrice?: number;
  trackId?: string;
  updateNeed: boolean;
  currencyPrice: number;
}
export interface PurchaseStepsData {
  rules: string[];
  balance: WalletBalanceInterface;
  addresses: WalletAddressInterface[];
  cart: {
    coinId: string;
    network: NetworkType;
  };
}
export interface SellStepsData {
  rules: string[];
  checkoutTimes: {
    title: string;
    items: {
      name: string;
      value: string;
    }[];
  };
  deepLinks: {
    trustWallet: string;
  };
  depositAddress: {
    address: string;
    tag?: string;
  };
  balance: WalletBalanceInterface;
  currency: {
    id: string;
    shortName: string;
    enName: string;
    faName: string;
    icon: string;
  };
}
export interface OrderCreationResponse {
  status: 1 | 3 | 10;
  alert: string;
}

export interface OrderOverviewResponse {
  summary: {
    count: number;
    sum: number;
  };
  count: number;
  totalPrice: number;
  currencies: {
    faName: string;
    enName: string;
    icon: string;
    color: string;
    shortName: string;
    ordersCount: number;
    totalPrice: number;
  }[];
  pie: AssetSummeryPie;
  othersCount: number;
  othersTotalPrice: number;
}
