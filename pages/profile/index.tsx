import type { NextPage } from "next";
import Head from "next/head";
import localize from "@/core/localization";
import ProfileMobilePage from "@/modules/profile/presentation/pages/profile-mobile";

const Profile: NextPage = () => {
  return (
    <>
      <Head>
        <title>{localize("PROFILE__TITLE")}</title>
        <meta name="description" content={localize("PROFILE__DESC")} />
      </Head>
      <ProfileMobilePage />
    </>
  );
};

export default Profile;
