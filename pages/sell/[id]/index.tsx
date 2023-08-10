import type { NextPage } from "next";
import SellPage from "@/modules/order/presentation/pages/sell";
import localize from "@/core/localization";
import Head from "next/head";

const Sell: NextPage = () => {
  return (
    <>
      <Head>
        <title>{localize("SELL_STEPS__TITLE")}</title>
        <meta name="description" content={localize("SELL_STEPS__DESC")} />
      </Head>
      <SellPage />
    </>
  );
};

export default Sell;
