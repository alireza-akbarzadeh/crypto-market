import { useRouter } from "next/router";
import { useSellStepsDS } from "../../data/datasources/order.datasource";
import { DefaultFetchConfig } from "@/core/constants/types";
import sellStepsModelMapper from "../../data/model/sellSteps";

export default function useSellSteps(config?: DefaultFetchConfig) {
  const router = useRouter();
  const id = router.query?.id;
  const { data, error, mutate, isValidating } = useSellStepsDS(
    typeof id === "string" ? id : "",
    config
  );

  return {
    data: data?.result ? sellStepsModelMapper(data.result) : undefined,
    error: data?.error || error,
    mutate,
    loading: isValidating,
  };
}
