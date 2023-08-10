import { CreateWalletAddressFormValues } from "./../entities/form-values";
import { createWalletAddressDS } from "../../data/datasources/wallet.datasource";

export default async function createWalletAddress(
  model: CreateWalletAddressFormValues
) {
  const { address, coin, tag, title, network } = model;
  const { success, message, error } = await createWalletAddressDS({
    network_id: network!.id,
    currency_id: coin!.id,
    address,
    tag,
    name: title,
  });

  if (!success) return { error };

  return {
    data: message,
  };
}
