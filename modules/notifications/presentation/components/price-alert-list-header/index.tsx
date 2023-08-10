import { useErrorHandler } from "@/core/hooks";
import { CoinDataInterface } from "@/modules/coin/domain/entities/coin";
import getCoinPrice from "@/modules/coin/domain/usecases/getCoinPrice";
import { PriceAlertGroup } from "@/modules/notifications/domain/entities/priceAlerts";
import PriceAlertListHeaderView from "./price-alert-list-header.view";

type PropTypes = {
  data: Omit<PriceAlertGroup, "alerts" | "hasMore">;
  setSelectedCoin: (coin: CoinDataInterface) => void;
};
export default function PriceAlertListHeaderComponent(props: PropTypes) {
  const errorHandler = useErrorHandler();
  const onAdd = async () => {
    const { data, error } = await getCoinPrice({
      id: props.data.coinId?.toString(),
    });
    if (error || !data) {
      return errorHandler(error);
    }
    props.setSelectedCoin(data);
  };
  return <PriceAlertListHeaderView {...props} onAdd={onAdd} />;
}
