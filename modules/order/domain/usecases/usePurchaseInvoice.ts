import { useRouter } from "next/router";
import { usePurchaseInvoiceDS } from "../../data/datasources/order.datasource";
// import purchaseStepsModelMapper from "../../data/model/purchaseSteps";
import { DefaultFetchConfig } from "@/core/constants/types";
import buyOrderModelMapper from "../../data/model/buyOrder";

export default function usePurchaseInvoice(config?: DefaultFetchConfig) {
  const router = useRouter();
  const id = router.query?.id;
  const { data, error, mutate, isValidating } = usePurchaseInvoiceDS(
    typeof id === "string" ? id : "",
    config
  );

  return {
    data: buyOrderModelMapper(data?.result),
    error: data?.error || error,
    mutate,
    loading: isValidating,
  };
}
