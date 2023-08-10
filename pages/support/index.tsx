import type { NextPage } from "next";
import localize from "@/core/localization";
import Head from "next/head";
import SupportPage from "@/modules/support/presentation/pages/support";

const Support: NextPage = () => {
  return (
    <>
      <Head>
        <title>{localize("SELL_STEPS__TITLE")}</title>
        <meta name="description" content={localize("SELL_STEPS__DESC")} />
      </Head>
      <SupportPage />
    </>
  );
};

export default Support;
