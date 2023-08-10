import { getCoinPriceDS } from "../../data/datasources/coin.datasource";
import coinDataModelMapper from "../../data/models/coinData";

export default async function getCoinPrice(params: any) {
  const { result, error, success } = await getCoinPriceDS(params);
  if (!success) return { error };

  return { data: coinDataModelMapper(result?.items?.[0], result.meta) };
}
