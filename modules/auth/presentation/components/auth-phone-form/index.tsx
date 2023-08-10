import AuthPhoneFormView from "./auth-phone-form.view";
import * as Yup from "yup";
import yupSchema from "@/core/helpers/yupSchema";
import { FormikHelpers } from "formik";

const schema = Yup.object().shape({
  phoneNumber: yupSchema.phoneNumber,
});

type PropTypes = {
  onSubmit: (values: any, helpers: FormikHelpers<any>) => void;
};
export default function AuthPhoneFormComponent(props: PropTypes) {
  const { onSubmit } = props;
  const handleSubmit = (values: any, helpers: FormikHelpers<any>) => {
    return onSubmit(values, helpers);
  };
  return <AuthPhoneFormView {...{ schema, handleSubmit }} />;
}
