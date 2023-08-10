import { useMemo } from "react";
import { useKycStatusDS } from "../../data/datasources/kyc.datasource";
import kycStatusModelMapper from "../../data/model/kycStatus";

export default function useKycStatus() {
  const { data, error } = useKycStatusDS();
  if (data?.error || error) return { error: data?.error || error };
  return {
    data: useMemo(() => {
      return kycStatusModelMapper(data?.result);
    }, [data?.result]),
  };
}
