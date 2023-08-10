import { getCoinPricesDS } from "@/modules/coin/data/datasources/coin.datasource";
import coinDataModelMapper from "@/modules/coin/data/models/coinData";
import { CoinDataInterface } from "@/modules/coin/domain/entities/coin";
import getCoinPrice from "@/modules/coin/domain/usecases/getCoinPrice";
import { GetStaticPaths, GetStaticProps } from "next";
import { ReactNode } from "react";
import TradeView from "./trade.view";

type PropTypes = {
  children?: ReactNode;
  coinsFallback: any;
  selectedCoin?: CoinDataInterface;
};
export default function TradePage(props: PropTypes) {
  return <TradeView {...props} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
export const getStaticProps: GetStaticProps = async (context) => {
  const coinsRes = await getCoinPricesDS({ page: 1 });
  if (coinsRes.error) throw coinsRes.error;
  const props: any = {
    coinsFallback: [coinsRes],
  };
  if (typeof context.params?.coin === "string") {
    const coin = coinsRes.result.items.find(
      (c: any) => c.coin === context.params!.coin
    );
    if (coin) {
      props.selectedCoin = coinDataModelMapper(coin, coinsRes.result.meta);
    } else {
      const coinData = await getCoinPrice({
        coin: context.params!.coin.toUpperCase(),
      });
      if (coinData.data) {
        props.selectedCoin = coinData.data;
      }
    }
  }
  return { props, revalidate: 60 };
};
