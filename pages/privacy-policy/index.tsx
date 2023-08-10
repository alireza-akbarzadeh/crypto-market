import type { NextPage } from "next";
import PrivacyPolicyPage from "@/modules/app-properties/presentation/pages/privacy-policy";
// import localize from "@/core/localization";
import Head from "next/head";

const PrivacyPolicy: NextPage = () => {
  return (
    <>
      {/* <Head>
        <title>{localize("PORTFOLIO__TITLE")}</title>
        <meta name="description" content={localize("PORTFOLIO__DESC")} />
      </Head> */}
      <PrivacyPolicyPage />
    </>
  );
};

export default PrivacyPolicy;
