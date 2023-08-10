import { deleteWalletAddressDS } from "../../data/datasources/wallet.datasource";

export default async function deleteWalletAddress(addressId: string) {
  const { message, error } = await deleteWalletAddressDS(addressId);
  if (error) return { error };

  return { data: message };
}
