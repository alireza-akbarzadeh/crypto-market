import { useSnackbar } from "notistack";
import { DEFAULT_ERROR_MESSAGE } from "@/core/constants/config";
import { ResponseError } from "../http";
import useErrorDialog from "./useErrorDialog";

type ActionMap = {
  [key: string]: (close: () => void) => void;
};
export default function useErrorHandler(actionMap?: ActionMap) {
  const { enqueueSnackbar } = useSnackbar();
  const errorDialog = useErrorDialog(actionMap);

  return (error?: ResponseError | null) => {
    if (!error) return;
    if (error.dialog) {
      errorDialog(error.dialog);
      return;
    }
    if (error.message) {
      enqueueSnackbar(error.message || DEFAULT_ERROR_MESSAGE, {
        variant: "error",
      });
    }
  };
}
