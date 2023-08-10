import type { NextPage } from "next";
import localize from "@/core/localization";
import Head from "next/head";
import PriceAlertsPage, {
  getStaticProps,
} from "@/modules/notifications/presentation/pages/price-alerts";

const PriceAlert: NextPage = (props: any) => {
  return (
    <>
      <Head>
        <title>{localize("PRICE_ALERT__TITLE")}</title>
        <meta name="description" content={localize("PRICE_ALERT__TITLE")} />
      </Head>
      <PriceAlertsPage {...props} />
    </>
  );
};

export default PriceAlert;
export { getStaticProps };
