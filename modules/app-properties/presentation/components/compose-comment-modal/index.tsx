import { UserCommentsFormValues } from "@/modules/app-properties/domain/entities/form-values";
import { FormikHelpers } from "formik";
import ComposeCommentModalView from "./compose-comment-modal.view";

type PropTypes = {
  open: boolean;
  onClose: () => void;
  schema: any;
  onSubmit: (
    values: UserCommentsFormValues,
    helper: FormikHelpers<UserCommentsFormValues>
  ) => void;
};
export default function ComposeCommentModalComponent(props: PropTypes) {
  return <ComposeCommentModalView {...props} />;
}
