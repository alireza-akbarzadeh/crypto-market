import { useSnackbar } from "notistack";
import copy from "copy-to-clipboard";

export default function useCopyToClipboard(
  fallback?: (success: boolean) => void
) {
  const { enqueueSnackbar } = useSnackbar();
  return async (text: string) => {
    // if (!navigator?.clipboard?.writeText) return;
    // await navigator.clipboard.writeText(text);

    const success = copy(text);
    if (fallback) {
      fallback(success);
      return;
    }
    if (!success) return;
    enqueueSnackbar("کپی شد.", { variant: "success" });
  };
}
