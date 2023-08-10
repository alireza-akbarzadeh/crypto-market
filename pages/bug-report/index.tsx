import type { NextPage } from "next";
import Head from "next/head";
import BugReportPage from "@/modules/app-properties/presentation/pages/bug-report";
import localize from "@/core/localization";

const BugReport: NextPage = () => {
  return (
    <>
      <Head>
        <title>{localize("BUG_REPORT__TITLE")}</title>
        <meta name="description" content={localize("BUG_REPORT__DESC")} />
      </Head>
      <BugReportPage />
    </>
  );
};

export default BugReport;
