import { toFormData } from "@/core/helpers";
import { uploadKycNationalCardDS } from "../../data/datasources/kyc.datasource";

export default async function uploadKycNationalCard(image: Blob) {
  const { result, error } = await uploadKycNationalCardDS(
    toFormData({
      image,
    })
  );
  return { data: result, error };
}
