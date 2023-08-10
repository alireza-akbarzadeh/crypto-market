import { useDispatch, useErrorHandler, useSelector } from "@/core/hooks";
import useUser from "@/modules/auth/domain/usecases/useUser";
import WalletAddressModalView from "./wallet-address-modal.view";
import * as Yup from "yup";
import yupSchema from "@/core/helpers/yupSchema";
import { openAlert } from "@/modules/_app/presentation/redux";
import {
  NetworkType,
  WalletAddressCoinInterface,
} from "@/modules/wallet/domain/entities/coin";
import { useEffect, useMemo, useRef, useState } from "react";
import { CreateWalletAddressFormValues } from "@/modules/wallet/domain/entities/form-values";
import createWalletAddress from "@/modules/wallet/domain/usecases/createWalletAddress";
import { useSnackbar } from "notistack";
import { PurchaseStepsData } from "@/modules/order/domain/entities/order";

type PropTypes = {
  open: boolean;
  onClose: () => void;
  data?: PurchaseStepsData["cart"];
  mutate?: () => void;
};
export default function WalletAddressModalComponent(props: PropTypes) {
  const { onClose, open, data, mutate } = props;
  const formikRef = useRef<any>();
  const { user } = useUser();
  const dispatch = useDispatch();
  const [coin, setCoin] = useState<WalletAddressCoinInterface>();
  const [network, setNetwork] = useState<NetworkType>();
  const errorHandler = useErrorHandler();
  const { enqueueSnackbar } = useSnackbar();

  const schema = useMemo(() => {
    return Yup.object().shape({
      address: yupSchema.coinAddress(network?.addressRegex),
      tag: yupSchema.coinTag(network?.tagRegex),
      title: yupSchema.coinTitle,
      network: yupSchema.coinNetwork,
      coin: yupSchema.coin,
    });
  }, [network]);

  useEffect(() => {
    if (!data) return;
    setNetwork(data.network);
  }, [data]);

  useEffect(() => {
    if (!formikRef?.current) return;
    formikRef.current.validateForm();
  }, [schema]);

  const handleCoinSelect = (coin: WalletAddressCoinInterface) => {
    setCoin(coin);
    setNetwork(undefined);
  };
  const handleClose = () => {
    setCoin(undefined);
    setNetwork(undefined);
    onClose();
  };
  const handleNetworkSelect = (network: NetworkType) => {
    setNetwork(network);
  };

  const onSubmit = async (value: CreateWalletAddressFormValues) => {
    const handler = async () => {
      const { error, data } = await createWalletAddress(value);
      if (error) {
        errorHandler(error);
        return;
      }
      if (mutate) mutate();
      enqueueSnackbar(data, { variant: "success" });
      onClose();
    };
    if (!network?.hasTag || value.tag) {
      return handler();
    }
    dispatch(
      openAlert({
        message: `<p>آدرس ارز انتخابی شما ممکن است <strong>تگ یا ممو</strong> داشته باشد. در صورت داشتن تگ یا ممو آن را وارد کنید. هرگونه اشتباه در وارد کردن تگ یا ممو بر عهده شما خواهد بود.</p>`,
        // "من می پذیرم آدرس کیف پول من فاقد تگ یا ممو می باشد و هرگونه اشتباه در وارد کردن تگ یا مموی ثبت شده بر عهده من خواهد بود.",
        variant: "warning",
        htmlMessage: true,
        actionButtons: [
          {
            title: "بازگشت",
            handler: (close: any) => close(),
            variant: "outlined",
          },
          {
            title: "می‌پذیرم",
            time: 5,
            handler: (close: any) => {
              // dispatch(openBankCardModal());
              handler();
              close();
            },
          },
        ],
      })
    );
  };

  return (
    <WalletAddressModalView
      {...{
        user,
        open,
        data,
        closeAddressModal: handleClose,
        onSubmit,
        schema,
        handleCoinSelect,
        handleNetworkSelect,
        formikRef,
      }}
    />
  );
}
