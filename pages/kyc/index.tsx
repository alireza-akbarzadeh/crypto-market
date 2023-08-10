import KycStatusPage from "@/modules/kyc/presentation/pages/kyc-status";
import type { NextPage } from "next";
import localize from "@/core/localization";
import Head from "next/head";

const KycStatus: NextPage = () => {
  return (
    <>
      <Head>
        <title>{localize("KYC__TITLE")}</title>
        <meta name="description" content={localize("KYC__DESC")} />
      </Head>
      <KycStatusPage />
    </>
  );
};

export default KycStatus;
