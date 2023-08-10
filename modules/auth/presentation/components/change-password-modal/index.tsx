import { useDispatch, useErrorHandler } from "@/core/hooks";
import changePassword from "@/modules/auth/domain/usecases/changePassword";
import forgetPassword from "@/modules/auth/domain/usecases/forgetPassword";
import forgetSetPassword from "@/modules/auth/domain/usecases/forgetSetPassword";
import useLogout from "@/modules/auth/domain/usecases/useLogout";
import useUser from "@/modules/auth/domain/usecases/useUser";
import verifyForgetOtp from "@/modules/auth/domain/usecases/verifyForgetOtp";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { openLoginModal, setToken } from "../../redux";
import { AuthSetPasswordFormValues } from "../auth-set-password-form/auth-set-password-form.view";
import ChangePasswordModalView, {
  AuthChangePasswordFormValues,
  ChangePasswordModalState,
} from "./change-password-modal.view";

type PropTypes = {
  open: boolean;
  onClose: () => void;
};
export default function ChangePasswordModalComponent(props: PropTypes) {
  const { open, onClose } = props;
  const errorHandler = useErrorHandler();
  const { enqueueSnackbar } = useSnackbar();
  const logout = useLogout();
  const dispatch = useDispatch();
  const { user } = useUser();
  const [state, setState] = useState<ChangePasswordModalState>(
    ChangePasswordModalState.Initial
  );
  const [time, setTime] = useState();
  const [tempAuth, setTempAuth] = useState();
  const [tempToken, setTempToken] = useState();
  const [code, setCode] = useState<string>();

  useEffect(() => {
    if (open) return;
    const timeout = setTimeout(() => {
      setState(ChangePasswordModalState.Initial);
      setTime(undefined);
      setTempAuth(undefined);
      setTempToken(undefined);
      setCode(undefined);
    }, 200);
    return () => {
      clearTimeout(timeout);
    };
  }, [open]);
  const onSubmit = async (values: AuthChangePasswordFormValues) => {
    const { data, error } = await changePassword(values);
    if (error) {
      return errorHandler(error);
    }
    enqueueSnackbar(data, { variant: "success" });
    onClose();
    logout(true);
    dispatch(openLoginModal());
  };
  const handleOpenForgot = async () => {
    if (!user) return;
    const { error, data } = await forgetPassword(user.phoneNumber);
    if (error) {
      errorHandler(error);
      return;
    }
    setTime(data?.time);
    setTempAuth(data?.tempAuth);
    setState(ChangePasswordModalState.Otp);
  };
  const submitForgetCode = async (code: string) => {
    if (!tempAuth || !user) return;
    const { error, data } = await verifyForgetOtp({
      code,
      phoneNumber: user.phoneNumber,
      tempAuth,
    });
    if (error || !data) return errorHandler(error);

    setTempToken(data.token);
    setCode(code);
    setState(ChangePasswordModalState.SetNew);
  };

  const submitForgetPassword = async (model: AuthSetPasswordFormValues) => {
    if (!tempToken || !tempAuth || !user) return;
    const { data, error } = await forgetSetPassword(
      {
        ...model,
        tempAuth,
        code: code || "482746",
        phoneNumber: user.phoneNumber,
      },
      tempToken
    );
    if (error || !data?.token) {
      errorHandler(error);
      switch (error?.errorCode) {
        case 0:
          handleOpenForgot();
      }
      return;
    }
    dispatch(setToken(data.token));
    localStorage.setItem("token", data.token);
    onClose();
  };
  return (
    <ChangePasswordModalView
      {...{
        open,
        onClose,
        onSubmit,
        state,
        openForget: handleOpenForgot,

        phoneNumber: user?.phoneNumber,
        submitForgetCode,
        time,
        resendForgetCode: handleOpenForgot,

        submitForgetPassword,
      }}
    />
  );
}
