import { FormikHelpers } from "formik";
import { useState } from "react";
import AuthCodeFormView from "./auth-code-form.view";

type PropTypes = {
  phoneNumber?: string;
  resetPhoneNumber?: () => void;
  time?: any;
  onSubmit: (
    code: string,
    formikHelpers: FormikHelpers<any>
  ) => void | Promise<any>;
  resendCode: () => void;
  title?: string;
};
export default function AuthCodeFormComponent(props: PropTypes) {
  const { phoneNumber, resetPhoneNumber, time, onSubmit, resendCode, title } =
    props;
  const [resending, setResending] = useState(false);

  const handleResend = async () => {
    setResending(true);
    await resendCode();
    setResending(false);
  };
  const handleSubmit = async (
    { code }: { code: string },
    helpers: FormikHelpers<any>
  ) => {
    await onSubmit(code, helpers);
  };
  return (
    <AuthCodeFormView
      {...{
        title,
        handleSubmit,
        phoneNumber,
        resetPhoneNumber,
        time,
        resendCode: handleResend,
        resending,
      }}
    />
  );
}
