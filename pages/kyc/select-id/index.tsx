import type { NextPage } from "next";
import localize from "@/core/localization";
import Head from "next/head";
import KycSelectIdentityPage from "@/modules/kyc/presentation/pages/kyc-select-identity";

const KYC: NextPage = () => {
  return (
    <>
      <Head>
        <title>{localize("KYC__TITLE")}</title>
        <meta name="description" content={localize("KYC__DESC")} />
      </Head>
      <KycSelectIdentityPage />
    </>
  );
};
export default KYC;
