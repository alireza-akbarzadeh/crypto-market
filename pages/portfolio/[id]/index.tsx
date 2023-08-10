import type { NextPage } from "next";
import CoinAssetPage from "@/modules/asset/presentation/pages/coin-asset";
import localize from "@/core/localization";
import Head from "next/head";

const Asset: NextPage = () => {
  return (
    <>
      <Head>
        <title>{localize("PORTFOLIO__TITLE")}</title>
        <meta name="description" content={localize("PORTFOLIO__DESC")} />
      </Head>
      <CoinAssetPage />
    </>
  );
};

export default Asset;
