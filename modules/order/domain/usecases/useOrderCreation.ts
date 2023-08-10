import { useRouter } from "next/router";
import { useOrderCreationDS } from "../../data/datasources/order.datasource";
import orderCreationModelMapper from "../../data/model/orderCreation";

export default function useOrderCreation() {
  const router = useRouter();
  const { data, error, isValidating } = useOrderCreationDS(
    typeof router.query.orderId === "string" ? router.query.orderId : undefined
  );

  return {
    data: orderCreationModelMapper(data?.result),
    error: data?.error || error,
    isValidating,
  };
}
