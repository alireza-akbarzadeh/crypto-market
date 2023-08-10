export interface WalletBalanceInterface {
  available: number;
}
export interface WithdrawRequestConfirm {
  amount: number;
  date: string;
  name: string;
  trackId: string;
}
export interface WalletApplyModel {
  code: string;
  trackId: string;
}
