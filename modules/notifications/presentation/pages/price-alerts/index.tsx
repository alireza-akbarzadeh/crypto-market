import CoinSelectComponent from "@/core/components/form/coin-select";
import useUser from "@/modules/auth/domain/usecases/useUser";
import { getCoinPricesDS } from "@/modules/coin/data/datasources/coin.datasource";
import { CoinDataInterface } from "@/modules/coin/domain/entities/coin";
import usePriceAlerts from "@/modules/notifications/domain/usecases/usePriceAlerts";
import { GetStaticProps } from "next";
import { useState } from "react";
import AlertMoreDialogComponent from "../../components/alert-more-dialog";
import CreateAlertDialogComponent from "../../components/create-alert-dialog";
import PriceAlertsView from "./price-alerts.view";

type PropTypes = { coinsData: any };
export default function PriceAlertsPage(props: PropTypes) {
  const { data, mutate, isLoading } = usePriceAlerts();
  const [moreId, setMoreId] = useState<string>();
  const [coinSelectOpen, setCoinSelectOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState<CoinDataInterface>();
  const { user } = useUser();

  return (
    <>
      <PriceAlertsView
        data={data}
        mutate={mutate}
        onMore={(id) => setMoreId(id)}
        openCreateAlert={() => setCoinSelectOpen(true)}
        setSelectedCoin={setSelectedCoin}
        isLoading={isLoading}
        user={user}
      />
      <AlertMoreDialogComponent
        id={moreId}
        onClose={() => setMoreId(undefined)}
        mutate={mutate}
      />
      <CoinSelectComponent
        open={coinSelectOpen}
        setOpen={setCoinSelectOpen}
        skipInput
        skipPrice
        onChange={(coin: any) => setSelectedCoin(coin)}
        value={selectedCoin?.shortName}
        fallbackData={props.coinsData}
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
