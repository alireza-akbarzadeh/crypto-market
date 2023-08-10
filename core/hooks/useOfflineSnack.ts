import { SnackbarKey, useSnackbar } from "notistack";
import { useEffect } from "react";

export default function useOfflineSnack() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    let key: SnackbarKey;
    const onOffline = () => {
      key = enqueueSnackbar("عدم دسترسی به اینترنت!", {
        variant: "error",
        persist: true,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left",
        },
      });
    };
    const onOnline = () => {
      if (key) closeSnackbar(key);
    };
    window.addEventListener("offline", onOffline);
    window.addEventListener("online", onOnline);
    return () => {
      window.removeEventListener("offline", onOffline);
      window.removeEventListener("online", onOnline);
    };
  }, []);
}
