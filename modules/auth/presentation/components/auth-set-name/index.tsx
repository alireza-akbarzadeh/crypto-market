import AuthSetNameView, { AuthSetNameFormValues } from "./auth-set-name.view";
import * as Yup from "yup";
import yupSchema from "@/core/helpers/yupSchema";
import { FormikHelpers } from "formik";

const schema = Yup.object().shape({
  firstName: yupSchema.firstName,
  lastName: yupSchema.lastName,
});
type PropTypes = {
  onSubmit: (model: AuthSetNameFormValues) => void;
};
export default function AuthSetNameComponent(props: PropTypes) {
  const { onSubmit } = props;
  return <AuthSetNameView {...{ schema, onSubmit }} />;
}
