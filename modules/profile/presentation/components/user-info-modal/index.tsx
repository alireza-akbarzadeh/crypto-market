import { useDispatch, useErrorHandler, useSelector } from "@/core/hooks";
import { closeUserInfoModal } from "../../redux";
import UserInfoModalView from "./user-info-modal.view";
import * as Yup from "yup";
import yupSchema from "@/core/helpers/yupSchema";
import { UserInfoFormValues } from "@/modules/profile/domain/entities/form-values";
import profileUpdate from "@/modules/profile/domain/usecases/profileUpdate";
import { useSnackbar } from "notistack";
import useUser from "@/modules/auth/domain/usecases/useUser";
import { useRouter } from "next/router";

const schema = Yup.object().shape({
  fatherName: yupSchema.fatherName,
  nationalCode: yupSchema.nationalCode,
  birthDate: yupSchema.birthDate,
});

type PropTypes = {};
export default function UserInfoModalComponent(props: PropTypes) {
  const { isUserInfoModalOpen, userInfoModalRedirect } = useSelector(
    (s) => s.profile
  );
  const { mutate } = useUser();
  const dispatch = useDispatch();
  const router = useRouter();
  const errorHandler = useErrorHandler();
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => dispatch(closeUserInfoModal());
  const onSubmit = async (values: UserInfoFormValues) => {
    const { error, data, message } = await profileUpdate(values);
    if (error) {
      return errorHandler(error);
    }
    mutate();
    enqueueSnackbar(message, { variant: "success" });
    if (userInfoModalRedirect) router.push(userInfoModalRedirect);
    handleClose();
  };

  return (
    <UserInfoModalView
      {...{
        isOpen: isUserInfoModalOpen,
        onClose: handleClose,
        onSubmit,
        schema,
      }}
    />
  );
}
