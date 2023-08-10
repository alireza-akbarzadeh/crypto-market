import type { NextPage } from "next";
import RulesPage from "@/modules/app-properties/presentation/pages/rules";
import localize from "@/core/localization";
import Head from "next/head";

const TermsOfService: NextPage = () => {
  return (
    <>
      <Head>
        <title>{localize("TERMS_OF_SERVICE__TITLE")}</title>
        <meta name="description" content={localize("TERMS_OF_SERVICE__DESC")} />
      </Head>
      <RulesPage />
    </>
  );
};

export default TermsOfService;
