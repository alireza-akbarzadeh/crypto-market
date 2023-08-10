import type { NextPage } from "next";
import PurchasePage from "@/modules/order/presentation/pages/purchase";
import localize from "@/core/localization";
import Head from "next/head";

const Purchase: NextPage = () => {
  return (
    <>
      <Head>
        <title>{localize("BUY_STEPS__TITLE")}</title>
        <meta name="description" content={localize("BUY_STEPS__DESC")} />
      </Head>
      <PurchasePage />
    </>
  );
};
export default Purchase;
