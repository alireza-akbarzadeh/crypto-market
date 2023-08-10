import CoinSelectComponent from "@/core/components/form/coin-select";
import useUser from "@/modules/auth/domain/usecases/useUser";
import { getCoinPricesDS } from "@/modules/coin/data/datasources/coin.datasource";
import { CoinDataInterface } from "@/modules/coin/domain/entities/coin";
import useCoinNotifications from "@/modules/notifications/domain/usecases/useCoinNotifications";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import AlertMoreDialogComponent from "../../components/alert-more-dialog";
import CreateAlertDialogComponent from "../../components/create-alert-dialog";
import CoinAlertsView from "./coin-alerts.view";

type PropTypes = {};
export default function CoinAlertsPage() {
  const router = useRouter();
  const [moreId, setMoreId] = useState<string>();
  const [coinSelectOpen, setCoinSelectOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState<CoinDataInterface>();
  const { mutate } = useCoinNotifications({ coin: router.query.coin });
  const { user } = useUser();

  if (typeof router?.query?.coin !== "string") return null;

  return (
    <>
      <CoinAlertsView
        coin={router.query.coin}
        onMore={(id) => setMoreId(id)}
        openCreateAlert={() => setCoinSelectOpen(true)}
        setSelectedCoin={setSelectedCoin}
        user={user}
      />
      <AlertMoreDialogComponent
        id={moreId}
        onClose={() => setMoreId(undefined)}
      />
      <CoinSelectComponent
        open={coinSelectOpen}
        setOpen={setCoinSelectOpen}
        skipInput
        skipPrice
        onChange={(coin: any) => setSelectedCoin(coin)}
        value={selectedCoin?.shortName}
      />
      <CreateAlertDialogComponent
        selectedCoin={selectedCoin}
        onClose={() => setSelectedCoin(undefined)}
        mutate={mutate}
      />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const coinsRes = await getCoinPricesDS({ page: 1 });
  return { props: { coinsData: [coinsRes] }, revalidate: 60 };
};
