import KycVideoPage from "@/modules/kyc/presentation/pages/kyc-video";
import type { NextPage } from "next";
import localize from "@/core/localization";
import Head from "next/head";

const KYC: NextPage = () => {
  return (
    <>
      <Head>
        <title>{localize("KYC__TITLE")}</title>
        <meta name="description" content={localize("KYC__DESC")} />
      </Head>
      <KycVideoPage />
    </>
  );
};
export default KYC;
