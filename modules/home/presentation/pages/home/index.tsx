import { getCoinPricesDS } from "@/modules/coin/data/datasources/coin.datasource";
import { HomeDataInterface } from "@/modules/home/domain/entities/home";
import getHomeData from "@/modules/home/domain/usecases/getHomeData";
import { GetStaticProps } from "next";
import HomeView from "./home.view";

type PropTypes = { data: HomeDataInterface; coinsData?: any };
export default function HomePage(props: PropTypes) {
  return <HomeView {...props} />;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const [homeData, coinsData] = await Promise.all([
    getHomeData(),
    getCoinPricesDS({ page: 1 }),
  ]);

  if (!homeData.data || homeData.error)
    throw `exceptionHomePage : ${homeData.error}`;
  return {
    props: {
      data: homeData.data,
      coinsData: [coinsData],
    },
    revalidate: 10,
  };
};
