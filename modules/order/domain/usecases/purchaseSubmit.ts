import { purchaseSubmitDS } from "../../data/datasources/order.datasource";
import purchasePaymentModelMapper from "../../data/model/purchasePayment";

type PurchaseSubmitParams = {
  trackId: string;
  addressId: string;
  code?: string;
  cardId?: string;
  phoneNumber: string;
};
export default async function purchaseSubmit(
  id: string,
  model: PurchaseSubmitParams
) {
  const { trackId, code, cardId, phoneNumber, addressId } = model;
  const { result, error } = await purchaseSubmitDS(id, {
    track_id: trackId,
    user_wallet_id: addressId,
    code,
    rial_account_id: cardId,
    phone: phoneNumber,
  });
  if (error) return { error };

  return { data: purchasePaymentModelMapper(result) };
}
