import { PriceAlertItemPair } from "@/core/enums/notification.enums";
import { CoinDataInterface } from "@/modules/coin/domain/entities/coin";
import { useEffect, useMemo, useState } from "react";
import CreateAlertDialogView from "./create-alert-dialog.view";
import * as Yup from "yup";
import yupSchema from "@/core/helpers/yupSchema";
import createAlert from "@/modules/notifications/domain/usecases/createAlert";
import { useErrorHandler } from "@/core/hooks";
import { useSnackbar } from "notistack";

const schema = Yup.object().shape({
  price: yupSchema.price,
});

type PropTypes = {
  selectedCoin?: CoinDataInterface;
  onClose: () => void;
  mutate?: () => void;
};
export default function CreateAlertDialogComponent(props: PropTypes) {
  const { selectedCoin, onClose, mutate } = props;
  const [pair, setPair] = useState(PriceAlertItemPair.IRT);
  const [isBuy, setIsBuy] = useState(false);
  const errorHandler = useErrorHandler();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (selectedCoin?.shortName === "USDT") {
      setPair(PriceAlertItemPair.IRT);
    }
  }, [selectedCoin]);

  const hiddenPair = useMemo(() => {
    return selectedCoin?.shortName === "USDT";
  }, [selectedCoin]);

  const currentPrice = useMemo(() => {
    if (pair === PriceAlertItemPair.USDT) return selectedCoin?.price;
    if (isBuy) return selectedCoin?.buyPrice;
    return selectedCoin?.sellPrice;
  }, [selectedCoin, pair, isBuy]);

  const onSubmit = async ({ price }: any) => {
    if (!selectedCoin) return;

    const { error, data } = await createAlert({
      price,
      coin: selectedCoin?.shortName,
      pair,
      isBuy,
      up: +price >= currentPrice!,
    });
    if (error) return errorHandler(error);
    onClose();
    mutate?.();
    enqueueSnackbar(data, { variant: "success" });
  };

  return (
    <CreateAlertDialogView
      open={Boolean(selectedCoin)}
      {...{
        onClose,
        selectedCoin,
        pair,
        setPair,
        hiddenPair,
        toggleIsBuy: () => setIsBuy((b) => !b),
        isBuy,
        onSubmit,
        schema,
        currentPrice: currentPrice || 0,
      }}
    />
  );
}
