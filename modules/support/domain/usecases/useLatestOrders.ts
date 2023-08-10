import { useLatestOrdersDS } from "../../data/datasources/support.datasource";
import simpleOrderModelMapper from "../../data/model/simpleOrder";

export default function useLatestOrders() {
  const { rows, meta, error, mutate, setSize, size, isLoading } =
    useLatestOrdersDS(simpleOrderModelMapper);
  return { rows, meta, size, setSize, isLoading, mutate };
}
