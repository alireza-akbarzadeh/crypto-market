import { useRouter } from "next/router";
import { usePurchaseStepsDS } from "../../data/datasources/order.datasource";
import purchaseStepsModelMapper from "../../data/model/purchaseSteps";
import { DefaultFetchConfig } from "@/core/constants/types";

export default function usePurchaseSteps(config?: DefaultFetchConfig) {
  const router = useRouter();
  const id = router.query?.id;
  const { data, error, mutate, isValidating } = usePurchaseStepsDS(
    typeof id === "string" ? id : "",
    config
  );

  return {
    data: data?.result ? purchaseStepsModelMapper(data.result) : undefined,
    error: data?.error || error,
    mutate,
    loading: isValidating,
  };
}
