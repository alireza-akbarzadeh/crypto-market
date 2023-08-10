import type { NextPage } from "next";
import LivePricePage, {
  getStaticProps,
} from "@/modules/coin/presentation/pages/live-price";
import localize from "@/core/localization";
import Head from "next/head";

const LivePrice: NextPage = (props: any) => {
  return (
    <>
      <Head>
        <title>{localize("LIVE_PRICE__TITLE")}</title>
        <meta name="description" content={localize("LIVE_PRICE__DESC")} />
      </Head>
      <LivePricePage {...props} />
    </>
  );
};

export default LivePrice;
export { getStaticProps };
