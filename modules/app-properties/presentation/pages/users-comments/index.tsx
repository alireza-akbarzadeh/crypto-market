import { useState } from "react";
import UsersCommentsView from "./users-comments.view";
import useUser from "@/modules/auth/domain/usecases/useUser";
import yupSchema from "@/core/helpers/yupSchema";
import * as Yup from "yup";
import addComment from "@/modules/app-properties/domain/usecases/addComment";
import { UserCommentsFormValues } from "@/modules/app-properties/domain/entities/form-values";
import { useSnackbar } from "notistack";
import { useErrorHandler } from "@/core/hooks";
import { FormikHelpers } from "formik";
import ComposeCommentModal from "../../components/compose-comment-modal";

const schema = Yup.object().shape({
  message: yupSchema.message,
});
type PropTypes = {};
export default function UsersCommentsPage(props: PropTypes) {
  const { enqueueSnackbar } = useSnackbar();
  const errorHandler = useErrorHandler();
  const { user, userLoading } = useUser();
  const [composeModalOpen, setComposeModalOpen] = useState(false);

  const openCommentModal = () => {
    setComposeModalOpen(true);
  };
  const onSubmit = async (
    values: UserCommentsFormValues,
    helpers: FormikHelpers<UserCommentsFormValues>
  ) => {
    const { error, data } = await addComment(values);
    if (error) {
      return errorHandler(error);
    }
    helpers.resetForm();
    enqueueSnackbar(data, { variant: "success" });
    setComposeModalOpen(false);
  };

  return (
    <>
      <UsersCommentsView
        {...{
          onSubmit,
          schema,
          user,
          userLoading,
          openCommentModal,
        }}
      />
      <ComposeCommentModal
        open={composeModalOpen}
        onClose={() => setComposeModalOpen(false)}
        onSubmit={onSubmit}
        schema={schema}
      />
    </>
  );
}
