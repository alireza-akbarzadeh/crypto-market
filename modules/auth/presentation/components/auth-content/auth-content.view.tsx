import { AuthModalStack } from "../../utils/enums";
import GetPhoneNumber from "../auth-phone-form";
import { FormikHelpers } from "formik";
import AuthCodeFormComponent from "../auth-code-form";
import AuthSetNameComponent from "../auth-set-name";
import { AuthSetNameFormValues } from "../auth-set-name/auth-set-name.view";
import AuthSetPasswordFormComponent from "../auth-set-password-form";
import { AuthSetPasswordFormValues } from "../auth-set-password-form/auth-set-password-form.view";
import { AuthLoginPasswordFormValues } from "../auth-password-form/auth-password-form.view";
import AuthPasswordFormComponent from "../auth-password-form";

type PropTypes = {
  phoneNumber?: string;
  time?: string;
  resetPhoneNumber: () => void;
  submitRegisterCode: (code: string, helpers: FormikHelpers<any>) => void;
  submitForgetCode: (code: string, helpers: FormikHelpers<any>) => void;
  current?: AuthModalStack;
  submitPhone: ({ phoneNumber }: { phoneNumber: string }) => void;
  resendCode: () => void;
  resendForgetCode: () => void;
  submitName: (model: AuthSetNameFormValues) => void;
  submitSetPassword: (model: AuthSetPasswordFormValues) => void;
  submitLoginPassword: (model: AuthLoginPasswordFormValues) => void;
  submitLoginCode: (code: string, helpers: FormikHelpers<any>) => void;
  resendLoginCode: () => void;
  forgetPassword: () => void;
  submitForgetPassword: (model: AuthSetPasswordFormValues) => void;
};
export default function AuthContentView(props: PropTypes) {
  const {
    phoneNumber,
    resetPhoneNumber,
    submitRegisterCode,
    current,
    submitPhone,
    time,
    resendCode,
    submitName,
    submitSetPassword,
    submitLoginPassword,
    submitLoginCode,
    resendLoginCode,
    submitForgetCode,
    forgetPassword,
    submitForgetPassword,
    resendForgetCode,
  } = props;

  switch (current) {
    // Login
    case AuthModalStack.LoginPassword:
      return (
        <AuthPasswordFormComponent
          phoneNumber={phoneNumber}
          resetPhoneNumber={resetPhoneNumber}
          onSubmit={submitLoginPassword}
          forgetPassword={forgetPassword}
        />
      );
    case AuthModalStack.LoginOtp:
      return (
        <AuthCodeFormComponent
          // title="به کریپو خوش اومدی!"
          phoneNumber={phoneNumber}
          resetPhoneNumber={resetPhoneNumber}
          onSubmit={submitLoginCode}
          time={time}
          resendCode={resendLoginCode}
        />
      );
    // Register
    case AuthModalStack.RegisterOtp:
      return (
        <AuthCodeFormComponent
          phoneNumber={phoneNumber}
          resetPhoneNumber={resetPhoneNumber}
          onSubmit={submitRegisterCode}
          time={time}
          resendCode={resendCode}
        />
      );
    case AuthModalStack.SetName:
      return <AuthSetNameComponent onSubmit={submitName} />;
    case AuthModalStack.SetPassword:
      return <AuthSetPasswordFormComponent onSubmit={submitSetPassword} />;
    // Forget
    case AuthModalStack.ForgetOtp:
      return (
        <AuthCodeFormComponent
          phoneNumber={phoneNumber}
          resetPhoneNumber={resetPhoneNumber}
          onSubmit={submitForgetCode}
          time={time}
          resendCode={resendForgetCode}
        />
      );
    case AuthModalStack.ForgetSetPassword:
      return (
        <AuthSetPasswordFormComponent onSubmit={submitForgetPassword} forget />
      );
    default:
      return <GetPhoneNumber onSubmit={submitPhone} />;
  }
}
