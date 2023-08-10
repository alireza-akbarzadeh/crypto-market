import type { NextPage } from "next";
import Head from "next/head";
import AboutUsPage from "@/modules/app-properties/presentation/pages/about-us";
import localize from "@/core/localization";

const AboutUs: NextPage = () => {
  return (
    <>
      <Head>
        <title>{localize("ABOUT_US__TITLE")}</title>
        <meta name="description" content={localize("ABOUT_US__DESC")} />
      </Head>
      <AboutUsPage />
    </>
  );
};

export default AboutUs;
