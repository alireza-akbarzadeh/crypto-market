import { IbanStatus } from "@/core/enums/profile.enums";
import {
  useCopyToClipboard,
  useDispatch,
  useErrorHandler,
  useIsDesktopSize,
} from "@/core/hooks";
import { UserInterface } from "@/modules/auth/domain/entities/user";
import useUser from "@/modules/auth/domain/usecases/useUser";
import userDeleteIban from "@/modules/profile/domain/usecases/userDeleteIban";
import useUserIbanList from "@/modules/profile/domain/usecases/useUserIbanList";
import { openAlert } from "@/modules/_app/presentation/redux";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { openIbanModal } from "../../redux";
import IbanView from "./iban.view";

type PropTypes = {
  user: UserInterface;
  // isDesktopSize: boolean;
};
export default function IbanComponent(props: PropTypes) {
  const { user } = props;
  const isDesktopSize = useIsDesktopSize();

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const dispatch = useDispatch();
  const copyToClipboard = useCopyToClipboard();
  const { loading, data, mutate } = useUserIbanList();

  const errorHandler = useErrorHandler();
  const { enqueueSnackbar } = useSnackbar();

  const deleteHandler = (id: string) => async (close: any) => {
    close();
    const { data, error } = await userDeleteIban(id);
    if (error) {
      errorHandler(error);
      return;
    }
    enqueueSnackbar(data, { variant: "success" });
    mutate();
  };

  const deleteIban = (id: string) => {
    dispatch(
      openAlert({
        message: "آیا از حذف این شبای بانکی اطمینان دارید؟",
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
    <IbanView
      {...{
        isDesktopSize,
        user,
        data,
        openIbanModal: () => dispatch(openIbanModal()),
        copyToClipboard,
        deleteIban,
        closeConfirmModal: () => setConfirmModalOpen(false),
        confirmModalOpen,
        loading,
      }}
    />
  );
}
