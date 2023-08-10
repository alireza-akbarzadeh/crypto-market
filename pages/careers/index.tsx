import type { NextPage } from "next";
import CareersPage from "@/modules/app-properties/presentation/pages/careers";
import localize from "@/core/localization";
import Head from "next/head";

const Careers: NextPage = () => {
  return (
    <>
      <Head>
        <title>{localize("CAREERS__TITLE")}</title>
        <meta name="description" content={localize("CAREERS__DESC")} />
      </Head>
      <CareersPage />
    </>
  );
};

export default Careers;
