import AuthContentView from "./auth-content.view";
import { useState } from "react";
import { FormikHelpers } from "formik";
import { AuthModalStack } from "../../utils/enums";
import { useDispatch } from "@/core/hooks";
import { closeLoginModal, setToken } from "../../redux";
import loginOrRegister from "@/modules/auth/domain/usecases/loginOrRegister";
import { NextPage } from "@/core/enums/next-page.enums";
import { useErrorHandler } from "@/core/hooks";
import verifyOtp from "@/modules/auth/domain/usecases/verifyOtp";
import { AuthSetNameFormValues } from "../auth-set-name/auth-set-name.view";
import setName from "@/modules/auth/domain/usecases/setName";
import { AuthSetPasswordFormValues } from "../auth-set-password-form/auth-set-password-form.view";
import setPassword from "@/modules/auth/domain/usecases/setPassword";
import loginPassword from "@/modules/auth/domain/usecases/loginPassword";
import { AuthLoginPasswordFormValues } from "../auth-password-form/auth-password-form.view";
import verifyLoginOtp from "@/modules/auth/domain/usecases/verifyLoginOtp";
import forgetPassword from "@/modules/auth/domain/usecases/forgetPassword";
import verifyForgetOtp from "@/modules/auth/domain/usecases/verifyForgetOtp";
import forgetSetPassword from "@/modules/auth/domain/usecases/forgetSetPassword";

type PropTypes = {
  onPush: (route: AuthModalStack) => void;
  onReplace: (route: AuthModalStack) => void;
  onBack: () => void;
  onReset: () => void;
  current?: AuthModalStack;
};
export default function AuthContentComponent(props: PropTypes) {
  const { onPush, onBack, onReset, onReplace, current } = props;
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const errorHandler = useErrorHandler();
  const [tempAuth, setTempAuth] = useState();
  const [time, setTime] = useState();
  const [tempToken, setTempToken] = useState();
  const [_password, _setPassword] = useState<string>();

  const resetPhoneNumber = () => {
    setPhoneNumber("");
    onReset();
  };

  const finishLogin = (token: string) => {
    dispatch(setToken(token));
    localStorage.setItem("token", token);
    dispatch(closeLoginModal());
  };

  const submitPhone = async ({ phoneNumber }: { phoneNumber: string }) => {
    setPhoneNumber(phoneNumber);
    const { error, data } = await loginOrRegister(phoneNumber);

    switch (data?.nextPage) {
      case NextPage.LoginPassword:
        onPush(AuthModalStack.LoginPassword);
        break;
      case NextPage.RegisterOtp:
        setTempAuth(data.tempAuth);
        setTime(data.time);
        onPush(AuthModalStack.RegisterOtp);
        break;
      default:
        errorHandler(error);
    }
  };
  const resendCode = async () => {
    if (!phoneNumber) return onBack();
    const { error, data } = await loginOrRegister(phoneNumber);
    switch (data?.nextPage) {
      case NextPage.LoginPassword:
        onReplace(AuthModalStack.LoginPassword);
        break;
      case NextPage.RegisterOtp:
        setTempAuth(data.tempAuth);
        setTime(data.time);
        break;
      default:
        errorHandler(error);
    }
  };
  const submitRegisterCode = async (
    code: string,
    { setFieldError }: FormikHelpers<any>
  ) => {
    if (!tempAuth) return;
    const { error, data } = await verifyOtp({
      code,
      phoneNumber,
      tempAuth,
    });
    if (data?.token) {
      setTempToken(data.token);
    }
    switch (data?.nextPage) {
      case NextPage.SetName:
        onReplace(AuthModalStack.SetName);
        break;
      default:
        errorHandler(error);
    }
  };
  const submitName = async (model: AuthSetNameFormValues) => {
    if (!tempToken) return;
    const { error, data } = await setName(model, tempToken);

    if (error) {
      errorHandler(error);
      switch (error.errorCode) {
        case 0:
          onBack();
      }
      return;
    }
    switch (data?.nextPage) {
      case NextPage.SetPassword:
        onReplace(AuthModalStack.SetPassword);
        break;
      default:
        errorHandler();
    }
  };
  const submitSetPassword = async (model: AuthSetPasswordFormValues) => {
    if (!tempToken) return;
    const { data, error } = await setPassword(model, tempToken);

    if (error || !data?.token) {
      errorHandler(error);
      switch (error?.errorCode) {
        case 0:
          onBack();
      }
      return;
    }
    finishLogin(data.token);
  };
  const submitLoginPassword = async (model: AuthLoginPasswordFormValues) => {
    const { error, data } = await loginPassword(model, phoneNumber);
    if (data?.token) return finishLogin(data.token);

    if (data?.nextPage === NextPage.LoginOtp) {
      _setPassword(model.password);
      setTempAuth(data.tempAuth);
      setTime(data.time);
      onReplace(AuthModalStack.LoginOtp);
      return;
    }
    errorHandler(error);
  };
  const submitLoginCode = async (code: string) => {
    if (!tempAuth || !_password) return;
    const { error, data } = await verifyLoginOtp({
      code,
      password: _password,
      tempAuth,
      phoneNumber,
    });

    if (data?.token) return finishLogin(data.token);
    errorHandler(error);
  };
  const resendLoginCode = async () => {
    if (!_password) return;
    const { error, data } = await loginPassword(
      { password: _password },
      phoneNumber
    );
    if (data?.token) return finishLogin(data.token);

    if (data?.nextPage === NextPage.LoginOtp) {
      setTempAuth(data.tempAuth);
      setTime(data.time);
      return;
    }
    errorHandler(error);
  };
  const onForgetPassword = async () => {
    if (!phoneNumber) return onBack();
    const { error, data } = await forgetPassword(phoneNumber);
    if (error) {
      errorHandler(error);
      return;
    }
    setTime(data?.time);
    setTempAuth(data?.tempAuth);
    if (current !== AuthModalStack.ForgetOtp) {
      onPush(AuthModalStack.ForgetOtp);
    }
  };
  const submitForgetCode = async (
    code: string,
    { setFieldError }: FormikHelpers<any>
  ) => {
    if (!tempAuth) return;
    const { error, data } = await verifyForgetOtp({
      code,
      phoneNumber,
      tempAuth,
    });
    if (data?.token) {
      setTempToken(data.token);
    }
    switch (data?.nextPage) {
      case NextPage.ForgetSetPassword:
        setCode(code);
        onReplace(AuthModalStack.ForgetSetPassword);
        break;
      default:
        errorHandler(error);
    }
  };
  const submitForgetPassword = async (model: AuthSetPasswordFormValues) => {
    if (!tempToken || !tempAuth) return;
    const { data, error } = await forgetSetPassword(
      {
        ...model,
        tempAuth,
        code: code || "482746",
        phoneNumber,
      },
      tempToken
    );
    if (error || !data?.token) {
      errorHandler(error);
      switch (error?.errorCode) {
        case 0:
          onBack();
      }
      return;
    }
    finishLogin(data.token);
  };
  return (
    <AuthContentView
      {...{
        current,
        phoneNumber,
        resetPhoneNumber,
        submitRegisterCode,
        submitPhone,
        time,
        resendCode,
        submitName,
        submitSetPassword,
        submitLoginPassword,
        submitLoginCode,
        resendLoginCode,
        submitForgetCode,
        forgetPassword: onForgetPassword,
        submitForgetPassword,
        resendForgetCode: onForgetPassword,
      }}
    />
  );
}
