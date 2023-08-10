import { useFeesDS } from "../../data/datasources/coin.datasource";
import FeeModelMapper from "../../data/models/fee";

export default function useFees(params: any) {
  return useFeesDS(FeeModelMapper, params);
}
