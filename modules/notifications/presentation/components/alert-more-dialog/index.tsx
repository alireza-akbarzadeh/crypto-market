import { useErrorHandler } from "@/core/hooks";
import deleteAlert from "@/modules/notifications/domain/usecases/deleteAlert";
import { useSnackbar } from "notistack";
import AlertMoreDialogView from "./alert-more-dialog.view";

type PropTypes = {
  id?: string;
  onClose: () => void;
  mutate?: () => void;
};
export default function AlertMoreDialogComponent(props: PropTypes) {
  const { id, onClose, mutate } = props;
  const errorHandler = useErrorHandler();
  const { enqueueSnackbar } = useSnackbar();

  const onDelete = async () => {
    const _id = id;
    onClose();
    const { data, error } = await deleteAlert(_id!);
    if (error) {
      errorHandler(error);
      return;
    }
    mutate?.();
    enqueueSnackbar(data, { variant: "success" });
  };
  return (
    <AlertMoreDialogView
      open={Boolean(id)}
      onClose={onClose}
      onDelete={onDelete}
    />
  );
}
