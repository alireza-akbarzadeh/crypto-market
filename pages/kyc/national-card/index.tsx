import KycNationalCardPage from "@/modules/kyc/presentation/pages/kyc-national-card";
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
      <KycNationalCardPage />
    </>
  );
};
export default KYC;
