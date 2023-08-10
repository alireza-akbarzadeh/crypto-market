import { useDispatch, useErrorHandler } from "@/core/hooks";
import { UserCommentsFormValues } from "@/modules/app-properties/domain/entities/form-values";
import addContactUs from "@/modules/app-properties/domain/usecases/addContactUs";
import useUser from "@/modules/auth/domain/usecases/useUser";
import { openLoginModal } from "@/modules/auth/presentation/redux";
import { FormikHelpers } from "formik";
import { useSnackbar } from "notistack";
import ContactManagerView from "./contact-manager.view";
import useContactUs from "@/modules/app-properties/domain/usecases/useContactUs";
import yupSchema from "@/core/helpers/yupSchema";
import * as Yup from "yup";

const schema = Yup.object().shape({
  message: yupSchema.message,
});

type PropTypes = {};
export default function ContactManagerPage(props: PropTypes) {
  const { enqueueSnackbar } = useSnackbar();
  const errorHandler = useErrorHandler();
  const { user, userLoading } = useUser();
  const dispatch = useDispatch();
  const { mutate } = useContactUs();

  const onSubmit = async (
    values: UserCommentsFormValues,
    helpers: FormikHelpers<UserCommentsFormValues>
  ) => {
    const { error, data } = await addContactUs(values);
    if (error) {
      return errorHandler(error);
    }
    mutate();
    helpers.resetForm();
    enqueueSnackbar(data, { variant: "success" });
  };

  return (
    <ContactManagerView
      {...{
        user,
        onSubmit,
        schema,
        userLoading,
        openLoginModal: () => dispatch(openLoginModal()),
      }}
    />
  );
}
