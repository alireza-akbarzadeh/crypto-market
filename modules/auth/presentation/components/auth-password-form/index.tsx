import AuthPasswordFormView, {
  AuthLoginPasswordFormValues,
} from "./auth-password-form.view";
import { FormikHelpers } from "formik";
import * as Yup from "yup";
import yupSchema from "@/core/helpers/yupSchema";

const schema = Yup.object().shape({
  password: yupSchema.password,
});
type PropTypes = {
  resetPhoneNumber: () => void;
  onSubmit: (
    values: AuthLoginPasswordFormValues,
    helpers: FormikHelpers<AuthLoginPasswordFormValues>
  ) => void;
  phoneNumber?: string;
  forgetPassword: () => void;
};
export default function AuthPasswordFormComponent(props: PropTypes) {
  const { resetPhoneNumber, onSubmit, phoneNumber, forgetPassword } = props;
  return (
    <AuthPasswordFormView
      {...{ schema, resetPhoneNumber, onSubmit, phoneNumber, forgetPassword }}
    />
  );
}
