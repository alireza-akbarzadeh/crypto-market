import type { NextPage } from "next";
import localize from "@/core/localization";
import Head from "next/head";
import CoinAlertsPage from "@/modules/notifications/presentation/pages/coin-alerts";

const CoinAlerts: NextPage = (props: any) => {
  return (
    <>
      <Head>
        <title>{localize("COIN_ALERTS__TITLE")}</title>
        <meta name="description" content={localize("COIN_ALERTS__DESC")} />
      </Head>
      <CoinAlertsPage {...props} />
    </>
  );
};

export default CoinAlerts;
