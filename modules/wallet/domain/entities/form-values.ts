import { NetworkType } from "./coin";
import { WalletAddressCoinInterface } from "@/modules/wallet/domain/entities/coin";

export interface CreateWalletAddressFormValues {
  coin?: WalletAddressCoinInterface;
  network?: NetworkType;
  address: string;
  tag: string;
  title: string;
}
export interface WalletWithdrawFormValues {
  amount: number;
  iban: string;
}
export interface WalletDepositFormValues {
  amount: number;
  card: string;
}
