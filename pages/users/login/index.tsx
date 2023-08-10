import type { NextPage } from "next";
import AuthPage from "@/modules/auth/presentation/pages/auth";
import localize from "@/core/localization";
import Head from "next/head";

const Auth: NextPage = () => {
  return (
    <>
      <Head>
        <title>{localize("LOGIN__TITLE")}</title>
        <meta name="description" content={localize("LOGIN__DESC")} />
      </Head>
      <AuthPage />
    </>
  );
};

export default Auth;
