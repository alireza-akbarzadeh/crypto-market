import type { NextPage } from "next";
import ProfilePage from "@/modules/profile/presentation/pages/profile";
import Head from "next/head";
import localize from "@/core/localization";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { ProfileTabs } from "@/modules/profile/presentation/pages/profile/profile.view";

const Profile: NextPage = () => {
  const router = useRouter();
  const tab = useMemo(() => {
    if (
      !router.query.tab ||
      typeof router.query.tab !== "string" ||
      !Object.values(ProfileTabs).includes(router.query.tab as any)
    )
      return ProfileTabs.Account;
    return router.query.tab as ProfileTabs;
  }, [router.query.tab]);
  const tabTitle = useMemo(() => {
    switch (tab) {
      case ProfileTabs.WalletAddresses:
        return "PROFILE_ADDRESSES__TITLE";
      case ProfileTabs.BankCard:
        return "PROFILE_BANK_CARDS__TITLE";
      case ProfileTabs.Iban:
        return "PROFILE_IBANS__TITLE";
      case ProfileTabs.CurrencyWallet:
        return "PROFILE_WALLET__TITLE";
      default:
        return "PROFILE__TITLE";
    }
  }, [tab]);

  return (
    <>
      <Head>
        <title>{localize(tabTitle)}</title>
        <meta name="description" content={localize("PROFILE__DESC")} />
      </Head>
      <ProfilePage tab={tab} />
    </>
  );
};

export default Profile;
