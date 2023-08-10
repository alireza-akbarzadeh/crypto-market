import type { NextPage } from "next";
import localize from "@/core/localization";
import Head from "next/head";
import ConnectTelegramPage from "@/modules/notifications/presentation/pages/connect-telegram";

const ActiveTg: NextPage = () => {
  return (
    <>
      <Head>
        <title>{localize("ACTIVATE_TG__TITLE")}</title>
        <meta name="description" content={localize("ACTIVATE_TG__DESC")} />
      </Head>
      <ConnectTelegramPage />
    </>
  );
};

export default ActiveTg;
