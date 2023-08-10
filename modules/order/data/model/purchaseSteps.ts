import { PurchaseStepsData } from "./../../domain/entities/order";
import walletAddressModelMapper from "@/modules/wallet/data/model/walletAddress";
import walletBalanceModelMapper from "@/modules/wallet/data/model/walletBalance";
import networkModelMapper from "@/modules/_app/data/model/network";

export default function purchaseStepsModelMapper(data: any): PurchaseStepsData {
  const { rules, wallet, userWallets, cart } = data;
  return {
    rules,
    balance: walletBalanceModelMapper(wallet),
    addresses: userWallets.map((a: any) => walletAddressModelMapper(a)),
    cart: {
      coinId: cart.currencyId,
      network: networkModelMapper(cart.network),
    },
  };
}
