import WalletWithdrawView from "./wallet-withdraw.view";
import * as Yup from "yup";
import yupSchema from "@/core/helpers/yupSchema";
import { useState } from "react";
import WithdrawConfirmModalComponent from "../withdraw-confirm-modal";
import { IbanInterface } from "@/modules/profile/domain/entities/iban";
import { WalletWithdrawFormValues } from "@/modules/wallet/domain/entities/form-values";
import { withdrawRequest } from "@/modules/wallet/domain/usecases/withdrawRequest";
import { useDispatch, useErrorHandler, useIsDesktopSize } from "@/core/hooks";
import { WithdrawRequestConfirm } from "@/modules/wallet/domain/entities/wallet";
import { withdrawApply } from "@/modules/wallet/domain/usecases/withdrawApply";
import { useSnackbar } from "notistack";
import useWallet from "@/modules/wallet/domain/usecases/useWallet";
import { FormikHelpers } from "formik";
import { openAlert } from "@/modules/_app/presentation/redux";
import useTransactions from "@/modules/wallet/domain/usecases/useTransactions";

const schema = Yup.object().shape({
  amount: yupSchema.money,
  iban: yupSchema.iban,
});
type PropTypes = {
  ibans?: IbanInterface[];
  openHistory: () => void;
};
export default function WalletWithdrawComponent(props: PropTypes) {
  const { ibans, openHistory } = props;
  const isDesktopSize = useIsDesktopSize();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmData, setConfirmData] = useState<WithdrawRequestConfirm>();
  const errorHandler = useErrorHandler();
  const { enqueueSnackbar } = useSnackbar();
  const { data: walletData, mutate } = useWallet({ revalidateOnMount: false });
  const transactions = useTransactions();
  const dispatch = useDispatch();

  const onSubmit = async (values: WalletWithdrawFormValues) => {
    const { error, data } = await withdrawRequest(values);
    if (error) {
      errorHandler(error);
      return;
    }
    setConfirmData(data);
    setConfirmOpen(true);
  };

  const onSubmitCode = async (
    { code }: any,
    { resetForm }: FormikHelpers<any>
  ) => {
    const { error, data } = await withdrawApply({
      code,
      trackId: confirmData!.trackId,
    });
    if (error) {
      errorHandler(error);
      return;
    }
    setConfirmOpen(false);
    mutate();
    resetForm();

    if (!isDesktopSize) transactions.mutate();
    openHistory();
    enqueueSnackbar(data, { variant: "success" });
  };
  const handleAlert = (e: any, iban: IbanInterface) => {
    if (!iban.alert) return;
    e.stopPropagation();
    dispatch(
      openAlert({
        title: iban.alert,
        skipCloseIcon: true,
        actionButtons: [
          {
            title: "متوجه شدم",
            handler: (close: any) => {
              close();
            },
          },
        ],
      })
    );
  };

  return (
    <>
      <WalletWithdrawView
        {...{
          ibans,
          schema,
          onSubmit,
          handleAlert,
          balance: (walletData as any)?.balance?.available,
        }}
      />
      <WithdrawConfirmModalComponent
        {...{
          open: confirmOpen,
          onClose: () => setConfirmOpen(false),
          onSubmit: onSubmitCode,
          data: confirmData,
        }}
      />
    </>
  );
}
