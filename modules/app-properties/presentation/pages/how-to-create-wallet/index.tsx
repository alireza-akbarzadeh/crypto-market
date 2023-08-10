import { useRouter } from "next/router";
import { useMemo } from "react";
import HowToCreateWalletView from "./how-to-create-wallet.view";

type PropTypes = {};
export default function HowToCreateWalletPage(props: PropTypes) {
  const router = useRouter();
  const isCafeBazaar = useMemo(() => {
    if (!router.isReady) return;
    return router.query.cafeBazar === "true";
  }, [router.query.cafeBazar, router.isReady]);
  return <HowToCreateWalletView {...{ isCafeBazaar }} />;
}
