import { SellStepsData } from "./../../domain/entities/order";
// import walletAddressModelMapper from "@/modules/wallet/data/model/walletAddress";
import walletBalanceModelMapper from "@/modules/wallet/data/model/walletBalance";
// import networkModelMapper from "@/modules/_app/data/model/network";

export default function sellStepsModelMapper(data: any): SellStepsData {
  const {
    checkoutTimes,
    depositAddress,
    wallet,
    deepLinks,
    cart: { currency },
    rules = [],
  } = data;
  return {
    rules,
    // checkoutTimes: [],
    // checkoutTimes: checkoutTimes.map((t: any) => ({
    //   name: t.name,
    //   value: t.value,
    // })),
    depositAddress: {
      address: depositAddress.address,
      tag: depositAddress.tag,
    },
    deepLinks: { trustWallet: deepLinks.trustWallet },
    balance: walletBalanceModelMapper(wallet),
    currency: {
      id: currency?.id,
      shortName: currency?.coin,
      enName: currency?.enName,
      faName: currency?.faName,
      icon: currency?.icon,
    },
    checkoutTimes: {
      title: checkoutTimes.title,
      items: checkoutTimes.items.map(({ key, value }: any) => ({
        name: key,
        value,
      })),
    },
  };
}
