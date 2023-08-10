import { SellType } from "@/core/enums/order.enums";
import { sellCheckoutTypeDS } from "../../data/datasources/order.datasource";

const checkoutMap: any = {
  [SellType.Iban]: "iban",
  [SellType.Wallet]: "wallet",
};
export default async function sellCheckoutType(
  checkoutType: SellType,
  iban?: string
) {
  const { error, success } = await sellCheckoutTypeDS({
    checkoutType: checkoutMap[checkoutType],
    rial_account_id: iban,
  });
  if (!success) return { error };
  return {};
}
