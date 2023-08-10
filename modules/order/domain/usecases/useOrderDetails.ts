import orderModelMapper from "@/modules/order/data/model/order";
import { useOrderDetailsDS } from "../../data/datasources/order.datasource";

export default function useOrderDetails(id?: string) {
  const { data, error, isValidating, mutate } = useOrderDetailsDS(id);

  return {
    data: orderModelMapper(data?.result),
    error: data?.error || error,
    isValidating,
    mutate,
  };
}
