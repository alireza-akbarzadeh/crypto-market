import CoinSelectComponent from "@/core/components/form/coin-select";
import { useErrorHandler, useSelector } from "@/core/hooks";
import { GetAvailableAssetBalance } from "@/modules/asset/domain/usecases/getAvailableAssetBalance";
import useAssets from "@/modules/asset/domain/usecases/useAssets";
import { useAssetSummery } from "@/modules/asset/domain/usecases/useAssetSummery";
import useUser from "@/modules/auth/domain/usecases/useUser";
import { getCoinPricesDS } from "@/modules/coin/data/datasources/coin.datasource";
import { CoinDataInterface } from "@/modules/coin/domain/entities/coin";
import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import TradeModalComponent from "../../components/trade-modal";
import AssetView from "./asset.view";

type PropTypes = { coinsData: any };
export default function AssetPage(props: PropTypes) {
  const [isTop, setIsTop] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [coinSelectOpen, setCoinSelectOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState<CoinDataInterface>();
  const [availableAsset, setAvailableAsset] = useState<number>(0);
  const { user, userLoading } = useUser();
  const assetSummery = useAssetSummery();
  const assets = useAssets({ revalidateOnMount: true });
  const { token } = useSelector((s) => s.auth);
  const errorHandler = useErrorHandler();

  useEffect(() => {
    if (!assetSummery.isValidating && token) {
      assetSummery.mutate();
    }
    if (token && Object.keys(assets.meta).length) {
      assets.mutate();
    }
  }, [token]);

  useEffect(() => {
    if (!window) return;
    setIsTop(window.scrollY < 10);
    window.onscroll = (e) => {
      setIsTop(window.scrollY < 10);
    };
    return () => {
      window.onscroll = null;
    };
  }, []);

  const handleCoinChange = async (coin: CoinDataInterface) => {
    if (coin.id !== selectedCoin?.id) {
      const { error, data } = await GetAvailableAssetBalance(coin.id);
      if (error) {
        return errorHandler(error);
      }
      setAvailableAsset(data);
    }
    setSelectedCoin(coin);
    setAddModalOpen(true);
  };

  return (
    <>
      <AssetView
        {...{
          userLoading,
          isTop,
          user,
          summeryData: assetSummery.data,
          openAddModal: () => setCoinSelectOpen(true),
        }}
      />
      <TradeModalComponent
        open={addModalOpen}
        onClose={() => {
          setAddModalOpen(false);
          setSelectedCoin(undefined);
        }}
        coin={selectedCoin}
        mutate={() => {
          assetSummery.mutate();
          assets.mutate();
        }}
        changeCoin={() => setCoinSelectOpen(true)}
        availableAsset={availableAsset}
      />
      <CoinSelectComponent
        open={coinSelectOpen}
        setOpen={setCoinSelectOpen}
        skipInput
        skipPrice
        onChange={handleCoinChange as any}
        value={selectedCoin?.shortName}
        fallbackData={props.coinsData}
      />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const coinsRes = await getCoinPricesDS({ page: 1 });
  return { props: { coinsData: [coinsRes] }, revalidate: 60 };
};
