import { useErrorHandler, useRedirectNotUser } from "@/core/hooks";
import disconnectTelegram from "@/modules/notifications/domain/usecases/disconnectTelegram";
import useNotifications from "@/modules/notifications/domain/usecases/useNotifications";
import { useSnackbar } from "notistack";
import NotificationsView from "./notifications.view";

type PropTypes = {};
export default function NotificationsPage(props: PropTypes) {
  const { data, mutate } = useNotifications();
  const errorHandler = useErrorHandler();
  const { enqueueSnackbar } = useSnackbar();
  useRedirectNotUser();

  const disconnect = async () => {
    const { error, data } = await disconnectTelegram();
    if (error) {
      errorHandler(error);
      return;
    }
    mutate();
    enqueueSnackbar(data, { variant: "success" });
  };

  return (
    <NotificationsView
      data={data}
      mutate={mutate}
      disconnectTelegram={disconnect}
    />
  );
}
