import type { NextPage } from "next";
import UsersCommentsPage from "@/modules/app-properties/presentation/pages/users-comments";
import localize from "@/core/localization";
import Head from "next/head";

const UsersComments: NextPage = () => {
  return (
    <>
      <Head>
        <title>{localize("COMMENTS__TITLE")}</title>
        <meta name="description" content={localize("COMMENTS__DESC")} />
      </Head>
      <UsersCommentsPage />
    </>
  );
};

export default UsersComments;
