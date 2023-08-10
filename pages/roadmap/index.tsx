import type { NextPage } from "next";
import RoadmapPage from "@/modules/app-properties/presentation/pages/roadmap";
import localize from "@/core/localization";
import Head from "next/head";

const RoadMap: NextPage = () => {
  return (
    <>
      <Head>
        <title>{localize("ROADMAP__TITLE")}</title>
        <meta name="description" content={localize("ROADMAP__DESC")} />
      </Head>
      <RoadmapPage />
    </>
  );
};

export default RoadMap;
