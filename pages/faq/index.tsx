import type { NextPage } from "next";
import FaqPage from "@/modules/app-properties/presentation/pages/faq";
import localize from "@/core/localization";
import Head from "next/head";

const FAQ: NextPage = () => {
  return (
    <>
      <Head>
        <title>{localize("FAQ__TITLE")}</title>
        <meta name="description" content={localize("FAQ__DESC")} />
      </Head>
      <FaqPage />
    </>
  );
};

export default FAQ;
