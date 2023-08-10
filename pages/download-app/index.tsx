import type { NextPage } from "next";
import DownloadAppPage from "@/modules/app-properties/presentation/pages/download-app";
import localize from "@/core/localization";
import Head from "next/head";

const DownloadApp: NextPage = () => {
  return (
    <>
      <Head>
        <title>{localize("DOWNLOAD_APP__TITLE")}</title>
        <meta name="description" content={localize("DOWNLOAD_APP__DESC")} />
      </Head>
      <DownloadAppPage />
    </>
  );
};

export default DownloadApp;
