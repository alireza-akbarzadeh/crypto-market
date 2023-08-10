import IbanModalView from "./iban-modal.view";
import { useDispatch, useErrorHandler, useSelector } from "@/core/hooks";
import useUser from "@/modules/auth/domain/usecases/useUser";
import { useState } from "react";
import { closeIbanModal } from "../../redux";
import {
  closeLoadingModal,
  openAlert,
  openLoadingModal,
} from "@/modules/_app/presentation/redux";
import userIbanInquiry from "@/modules/profile/domain/usecases/userIbanInquiry";
import { UserIbanInquiryFormValues } from "@/modules/profile/domain/entities/form-values";
import { IbanInquiry } from "@/modules/profile/domain/entities/iban";
import userAddIban from "@/modules/profile/domain/usecases/userAddIban";
import useUserIbanList from "@/modules/profile/domain/usecases/useUserIbanList";

type PropTypes = {};
export default function IbanModalComponent(props: PropTypes) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmData, setConfirmData] = useState<IbanInquiry>();
  const { user } = useUser();
  const { isIbanModalOpen } = useSelector((s) => s.profile);
  const dispatch = useDispatch();
  const errorHandler = useErrorHandler();
  const { mutate } = useUserIbanList(false, { revalidateOnMount: false });

  const onSubmit = async (values: UserIbanInquiryFormValues) => {
    dispatch(
      openLoadingModal({
        title: "در حال بررسی شبای بانکی...",
        message: "لطفا چند لحظه منتظر بمانید.",
      })
    );
    const { error, data } = await userIbanInquiry(values);
    dispatch(closeLoadingModal());
    if (error) {
      errorHandler(error);
      return;
    }
    setConfirmData(data);
    setIsConfirmOpen(true);
  };
  const onConfirm = async () => {
    if (!confirmData?.trackId) return;
    dispatch(
      openLoadingModal({
        // title: "در حال بررسی توسط پشتیبانی...",
        title: "در حال ثبت درخواست...",
        message: "لطفا چند لحظه منتظر بمانید.",
      })
    );
    const { error, data } = await userAddIban(confirmData?.trackId);
    mutate();
    dispatch(closeLoadingModal());
    dispatch(closeIbanModal());
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
    <IbanModalView
      {...{
        user,
        isIbanModalOpen,
        closeIbanModal: () => dispatch(closeIbanModal()),
        onSubmit,
        isConfirmOpen,
        confirmData,
        closeConfirm: () => setIsConfirmOpen(false),
        onConfirm,
      }}
    />
  );
}
