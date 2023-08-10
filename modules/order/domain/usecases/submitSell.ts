import { DEFAULT_ERROR_MESSAGE } from "@/core/constants/config";
import { ResponseError } from "@/core/http";
import { submitSellDS } from "../../data/datasources/order.datasource";

export default async function submitSell(id: any, ibanId?: string) {
  if (typeof id !== "string") {
    const error = { message: DEFAULT_ERROR_MESSAGE } as ResponseError<any>;
    return { error };
  }

  const { success, error, message } = await submitSellDS(id, {
    rial_account_id: ibanId,
  });

  if (!success) return { error };
  return { data: message };
}
