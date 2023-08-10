import { userIbanInquiryDS } from "../../data/datasources/profile.datasource";
import { UserIbanInquiryFormValues } from "../entities/form-values";

export default async function userIbanInquiry({
  ibanNumber,
}: UserIbanInquiryFormValues) {
  const { success, result, error } = await userIbanInquiryDS({
    iban_number: ibanNumber,
  });
  if (!success) return { error };
  const { bank, name, number, trackId } = result;
  return {
    data: {
      ibanNumber: "IR" + number,
      name,
      trackId,
      origin: bank.name,
    },
  };
}
