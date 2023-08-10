import AuthSetPasswordFormView, {
  AuthSetPasswordFormValues,
} from "./auth-set-password-form.view";
import * as Yup from "yup";
import yupSchema from "@/core/helpers/yupSchema";
import { FormikHelpers } from "formik";

const schema = Yup.object().shape({
  password: yupSchema.newPassword,
  confirmPassword: yupSchema.confirmPassword,
});
type PropTypes = {
  onSubmit: (
    values: AuthSetPasswordFormValues,
    helpers: FormikHelpers<any>
  ) => void;
  forget?: boolean;
};
export default function AuthSetPasswordFormComponent(props: PropTypes) {
  const { onSubmit, forget } = props;
  return <AuthSetPasswordFormView {...{ schema, onSubmit, forget }} />;
}
