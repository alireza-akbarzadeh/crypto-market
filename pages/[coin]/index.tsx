import type { NextPage } from "next";
import CoinDetailsPage, {
  getStaticPaths,
  getStaticProps,
  PropTypes,
} from "@/modules/coin/presentation/pages/coin-details";
import Head from "next/head";

const Coin: NextPage<PropTypes> = (props) => {
  const { coin } = props;
  return (
    <>
      <Head>
        <title>{coin.name}</title>
      </Head>
      <CoinDetailsPage {...props} />
    </>
  );
};

export { getStaticPaths, getStaticProps };
export default Coin;
