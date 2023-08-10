import type { NextPage } from "next";
import AssetPage, {
  getStaticProps,
} from "@/modules/asset/presentation/pages/asset";
import localize from "@/core/localization";
import Head from "next/head";

const Portfolio: NextPage = (props: any) => {
  return (
    <>
      <Head>
        <title>{localize("PORTFOLIO__TITLE")}</title>
        <meta name="description" content={localize("PORTFOLIO__DESC")} />
      </Head>
      <AssetPage {...props} />
    </>
  );
};

export default Portfolio;
export { getStaticProps };
