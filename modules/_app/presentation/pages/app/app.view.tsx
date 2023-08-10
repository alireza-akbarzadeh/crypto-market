import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import moment from "moment-jalaali";
import { CssBaseline } from "@mui/material";
import { UserInterface } from "@/modules/auth/domain/entities/user";

const AuthModalComponent = dynamic(
  () => import("@/modules/auth/presentation/components/auth-modal"),
  { ssr: false }
);
const BankCardModalComponent = dynamic(
  () => import("@/modules/profile/presentation/components/bank-card-modal"),
  { ssr: false }
);
const IbanModalComponent = dynamic(
  () => import("@/modules/profile/presentation/components/iban-modal"),
  { ssr: false }
);
const AppAlertModalComponent = dynamic(
  () => import("@/modules/_app/presentation/components/app-alert-modal"),
  { ssr: false }
);
const UserInfoModalComponent = dynamic(
  () => import("@/modules/profile/presentation/components/user-info-modal"),
  { ssr: false }
);
const SupportModalComponent = dynamic(
  () => import("@/modules/support/presentation/components/support-modal"),
  { ssr: false }
);
const AppLoadingModalComponent = dynamic(
  () => import("../../components/app-loading-modal"),
  { ssr: false }
);

import SupportFabComponent from "../../components/support-fab";
import PageLoadingComponent from "../../components/page-loading";
import { useOfflineSnack } from "@/core/hooks";
import AppPageProgressComponent from "../../components/app-page-progress";

moment.loadPersian({ dialect: "persian-modern" });

type PropTypes = {
  user?: UserInterface;
  // routerLoading: boolean;
  // renderBottomNav: boolean;
} & AppProps;
export default function AppView(props: PropTypes) {
  const { Component, pageProps, user } = props;
  useOfflineSnack();

  return (
    <>
      <CssBaseline />
      <AppPageProgressComponent />
      <Component {...pageProps} />
      <PageLoadingComponent />

      <AppAlertModalComponent />
      <AppLoadingModalComponent />

      {user ? (
        <>
          <BankCardModalComponent />
          <IbanModalComponent />
          <UserInfoModalComponent />
        </>
      ) : (
        <AuthModalComponent />
      )}
      <SupportFabComponent />
      <SupportModalComponent />
    </>
  );
}
