import { changeAddressWalletDS } from "../../data/datasources/order.datasource";

export default async function changeAddressWallet(
  orderId: string,
  walletId: string
) {
  const { message, error } = await changeAddressWalletDS(orderId, {
    user_wallet_id: walletId,
  });
  if (error) return { error };
  return { data: message };
}
