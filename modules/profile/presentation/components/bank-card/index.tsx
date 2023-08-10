import { useEffect, useState } from "react";
import BankCardView from "./bank-card.view";
import useUser from "@/modules/auth/domain/usecases/useUser";
import { BankCardStatus } from "@/core/enums/profile.enums";
import {
  useCopyToClipboard,
  useDispatch,
  useErrorHandler,
  useIsDesktopSize,
} from "@/core/hooks";
import { closeBankCardModal, openBankCardModal } from "../../redux";
import { UserInterface } from "@/modules/auth/domain/entities/user";
import { openAlert } from "@/modules/_app/presentation/redux";
import useUserBankCards from "@/modules/profile/domain/usecases/useUserBankCards";
import userDeleteCard from "@/modules/profile/domain/usecases/userDeleteCard";
import { useSnackbar } from "notistack";

type PropTypes = {
  user: UserInterface;
  // isDesktopSize: boolean;
};
export default function BankCardComponent(props: PropTypes) {
  const { user } = props;
  const isDesktopSize = useIsDesktopSize();
  const dispatch = useDispatch();
  const copyToClipboard = useCopyToClipboard();
  const { data, loading, mutate } = useUserBankCards();
  const errorHandler = useErrorHandler();
  const { enqueueSnackbar } = useSnackbar();

  const deleteHandler = (id: string) => async (close: any) => {
    close();
    const { data, error } = await userDeleteCard(id);
    if (error) {
      errorHandler(error);
      return;
    }
    enqueueSnackbar(data, { variant: "success" });
    mutate();
  };

  const deleteCard = (id: string) => {
    dispatch(
      openAlert({
        message: "آیا از حذف این کارت اطمینان دارید؟",
        variant: "delete",
        skipCloseIcon: true,
        actionButtons: [
          {
            title: "خیر",
            variant: "outlined",
            handler: (close: any) => close(),
          },
          {
            title: "بله",
            handler: deleteHandler(id),
          },
        ],
      })
    );
  };

  return (
    <BankCardView
      {...{
        user,
        isDesktopSize,
        data,
        openBankCardModal: () => dispatch(openBankCardModal()),
        copyToClipboard,
        deleteCard,
        loading,
      }}
    />
  );
}
