import { useDispatch, useErrorHandler, useSelector } from "@/core/hooks";
import useUser from "@/modules/auth/domain/usecases/useUser";
import { BankCardInquiry } from "@/modules/profile/domain/entities/bank-card";
import { UserCardInquiryFormValues } from "@/modules/profile/domain/entities/form-values";
import userAddCard from "@/modules/profile/domain/usecases/userAddCard";
import userCardInquiry from "@/modules/profile/domain/usecases/userCardInquiry";
import useUserBankCards from "@/modules/profile/domain/usecases/useUserBankCards";
import {
  closeLoadingModal,
  openAlert,
  openLoadingModal,
} from "@/modules/_app/presentation/redux";
import { useState } from "react";
import { closeBankCardModal } from "../../redux";
import BankCardModalView from "./bank-card-modal.view";
import * as Yup from "yup";
import yupSchema from "@/core/helpers/yupSchema";

const schema = Yup.object().shape({
  cardNumber: yupSchema.cardNumber,
});

type PropTypes = {};
export default function BankCardModalComponent(props: PropTypes) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmData, setConfirmData] = useState<BankCardInquiry>();
  const { user } = useUser();
  const { isBankCardModalOpen } = useSelector((s) => s.profile);
  const dispatch = useDispatch();
  const errorHandler = useErrorHandler();
  const { mutate } = useUserBankCards(false, { revalidateOnMount: false });

  const onSubmit = async (values: UserCardInquiryFormValues) => {
    dispatch(
      openLoadingModal({
        title: "در حال بررسی کارت بانکی...",
        message: "لطفا چند لحظه منتظر بمانید.",
      })
    );
    const { data, error } = await userCardInquiry(values);
    dispatch(closeLoadingModal());
    if (error) {
      errorHandler(error);
      return;
    }

    setConfirmData(data);
    setIsConfirmOpen(true);
  };
  const handleConfirm = async () => {
    if (!confirmData?.trackId) return;
    dispatch(
      openLoadingModal({
        title: "در حال ثبت درخواست...",
        message: "لطفا چند لحظه منتظر بمانید.",
      })
    );
    const { error, data } = await userAddCard(confirmData.trackId);
    mutate();
    dispatch(closeLoadingModal());
    dispatch(closeBankCardModal());
    if (error) {
      errorHandler(error);
      return;
    }
    setIsConfirmOpen(false);
    dispatch(
      openAlert({
        message: data,
        variant: "success",
        actionButtons: [
          {
            title: "بستن",
            handler: (close: any) => close(),
          },
        ],
      })
    );
  };

  return (
    <BankCardModalView
      {...{
        user,
        isBankCardModalOpen,
        closeBankCardModal: () => dispatch(closeBankCardModal()),
        onSubmit,
        isConfirmOpen,
        closeConfirm: () => setIsConfirmOpen(false),
        confirmData,
        handleConfirm,
        schema,
      }}
    />
  );
}
