import { userCardInquiryDS } from "../../data/datasources/profile.datasource";
import { UserCardInquiryFormValues } from "../entities/form-values";

export default async function userCardInquiry({
  cardNumber,
}: UserCardInquiryFormValues) {
  const { success, result, error } = await userCardInquiryDS({
    card_number: cardNumber,
  });
  if (!success) return { error };
  const { number, name, trackId, bank } = result;
  return {
    data: {
      cardNumber: number,
      name,
      trackId,
      origin: bank.name,
    },
  };
}
