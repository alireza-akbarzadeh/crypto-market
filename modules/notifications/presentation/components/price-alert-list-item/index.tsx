import { useErrorHandler } from "@/core/hooks";
import { PriceAlertItem } from "@/modules/notifications/domain/entities/priceAlerts";
import changeAlertReached from "@/modules/notifications/domain/usecases/changeAlertReached";
import { useEffect, useState } from "react";
import PriceAlertListItemView from "./price-alert-list-item.view";

type PropTypes = {
  data?: PriceAlertItem;
  onMore: (id: string) => void;
  mutate?: () => void;
};
export default function PriceAlertListItemComponent(props: PropTypes) {
  const { data, onMore, mutate } = props;
  const [tempReached, setTempReached] = useState<boolean>();
  const errorHandler = useErrorHandler();

  useEffect(() => {
    setTempReached(undefined);
  }, [data?.reached]);

  const toggleReached = async (e: any) => {
    if (!data) return;
    const { checked } = e.target;
    setTempReached(checked);
    const { error } = await changeAlertReached(data.id, checked);
    if (error) {
      errorHandler(error);
      return;
    }
    mutate?.();
  };

  return (
    <PriceAlertListItemView
      data={data}
      openDelete={() => onMore(data!.id)}
      toggleReached={toggleReached}
      tempReached={tempReached}
    />
  );
}
