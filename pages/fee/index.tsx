import type { NextPage } from "next";
import FeePage from "@/modules/coin/presentation/pages/fee";
import localize from "@/core/localization";
import Head from "next/head";

const Fee: NextPage = () => {
  return (
    <>
      <Head>
        <title>{localize("FEES__TITLE")}</title>
        <meta name="description" content={localize("FEES__DESC")} />
      </Head>
      <FeePage />
    </>
  );
};

export default Fee;
