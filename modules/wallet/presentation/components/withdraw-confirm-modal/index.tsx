import { FormikHelpers } from "formik";
import WithdrawConfirmModalView from "./withdraw-confirm-modal.view";
import * as Yup from "yup";
import yupSchema from "@/core/helpers/yupSchema";
import { WithdrawRequestConfirm } from "@/modules/wallet/domain/entities/wallet";
import useUser from "@/modules/auth/domain/usecases/useUser";

const schema = Yup.object().shape({
  code: yupSchema.code,
});

type PropTypes = {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: any, helpers: FormikHelpers<any>) => void;
  data?: WithdrawRequestConfirm;
};
export default function WithdrawConfirmModalComponent(props: PropTypes) {
  const { user } = useUser();
  return <WithdrawConfirmModalView {...props} {...{ schema, user: user! }} />;
}
