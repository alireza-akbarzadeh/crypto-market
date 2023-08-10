import type { NextPage } from "next";
import localize from "@/core/localization";
import Head from "next/head";
import KycNationalCardSerialPage from "@/modules/kyc/presentation/pages/kyc-national-card-serial";

const KYC: NextPage = () => {
  return (
    <>
      <Head>
        <title>{localize("KYC__TITLE")}</title>
        <meta name="description" content={localize("KYC__DESC")} />
      </Head>
      <KycNationalCardSerialPage />
    </>
  );
};
export default KYC;
