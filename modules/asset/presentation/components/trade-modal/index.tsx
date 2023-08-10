import TradeModalView from "./trade-modal.view";
import yupSchema from "@/core/helpers/yupSchema";
import * as Yup from "yup";
import {
  AssetInterface,
  CreateAssetFormValues,
  TradeInterface,
} from "@/modules/asset/domain/entities/asset";
import { useMemo } from "react";
import createAsset from "@/modules/asset/domain/usecases/createAsset";
import { useErrorHandler } from "@/core/hooks";
import { useSnackbar } from "notistack";
import editAsset from "@/modules/asset/domain/usecases/editAsset";
import deleteAsset from "@/modules/asset/domain/usecases/deleteAsset";

type PropTypes = {
  open: boolean;
  onClose: () => void;
  mutate: () => void;
  data?: TradeInterface;
  coin?: AssetInterface["currency"];
  changeCoin?: () => void;
  availableAsset: number;
  allowSideEdit?: boolean;
};

export default function TradeModalComponent(props: PropTypes) {
  const {
    open,
    onClose,
    data,
    coin,
    mutate,
    changeCoin,
    availableAsset,
    allowSideEdit,
  } = props;
  const errorHandler = useErrorHandler();
  const { enqueueSnackbar } = useSnackbar();

  const schema = useMemo(() => {
    return Yup.object().shape({
      isSell: Yup.boolean(),
      amount: yupSchema.coinAmountMax(
        +availableAsset - (data?.totalAmount || 0),
        "isSell"
      ),
      price: yupSchema.coinPrice,
    });
  }, [availableAsset, data]);

  const initialFormData = useMemo(() => {
    if (data) {
      return {
        isSell: data.isSell,
        amount: data.totalAmount,
        price: data.totalCost,
      };
    }
    return {
      isSell: false,
      amount: "",
      price: "",
    };
  }, [data]);

  const handleRequest = async (values: CreateAssetFormValues) => {
    const model = { ...values, coin: coin as any };
    if (data) {
      return editAsset(data.id, model);
    }
    return createAsset(model);
  };

  const onSubmit = async (values: CreateAssetFormValues) => {
    const { data: res, error } = await handleRequest(values);
    if (error) {
      errorHandler(error);
      return;
    }
    enqueueSnackbar(res, { variant: "success" });
    mutate();
    onClose();
  };
  const handleDelete = async (setLoading: (val: boolean) => void) => {
    setLoading(true);
    const { data: res, error } = await deleteAsset(data!.id);
    setLoading(false);
    if (error) {
      errorHandler(error);
      return;
    }
    enqueueSnackbar(res, { variant: "success" });
    mutate();
    onClose();
  };
  return (
    <TradeModalView
      {...{
        open,
        onClose,
        onSubmit,
        schema,
        initialFormData,
        data,
        coin,
        handleDelete,
        changeCoin,
        availableAsset,
        allowSideEdit,
      }}
    />
  );
}
