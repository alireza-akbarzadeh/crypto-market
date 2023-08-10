import type { NextPage } from "next";
import HowToCreateWalletPage from "@/modules/app-properties/presentation/pages/how-to-create-wallet";
import localize from "@/core/localization";
import Head from "next/head";

const HowToCreateWallet: NextPage = () => {
  return (
    <>
      <Head>
        <title>{localize("CREATE_WALLET__TITLE")}</title>
        <meta name="description" content={localize("CREATE_WALLET__DESC")} />
      </Head>
      <HowToCreateWalletPage />
    </>
  );
};

export default HowToCreateWallet;
