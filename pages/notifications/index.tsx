import type { NextPage } from "next";
import localize from "@/core/localization";
import Head from "next/head";
import NotificationsPage from "@/modules/notifications/presentation/pages/notifications";

const Notifications: NextPage = () => {
  return (
    <>
      <Head>
        <title>{localize("NOTIFICATIONS__TITLE")}</title>
        <meta name="description" content={localize("NOTIFICATIONS__DESC")} />
      </Head>
      <NotificationsPage />
    </>
  );
};

export default Notifications;
