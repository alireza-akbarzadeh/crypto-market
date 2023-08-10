import { getHomeDataDS } from "../../data/datasources/home.datasource";
import homeDataModelMapper from "../../data/model/homeData";

export default async function getHomeData() {
  const { result, success, error } = await getHomeDataDS();
  if (!success) return { error };
  return { data: homeDataModelMapper(result) };
}
