import { kycNationalCardSerialNumberDS } from "../../data/datasources/kyc.datasource";

export default async function kycNationalCardSerialNumber(code: string) {
  const { result, error, success } = await kycNationalCardSerialNumberDS(code);
  if (!success) return { error };
  return { data: result };
}
