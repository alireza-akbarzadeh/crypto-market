import { useMemo } from "react";
import { useNotificationsDS } from "../../data/datasources/notifications.datasource";
import notificationsModelMapper from "../../data/model/notifications";

export default function useNotifications() {
  const { data, error, mutate } = useNotificationsDS();

  return {
    error: data?.error || error,
    data: useMemo(
      () => (data?.result ? notificationsModelMapper(data.result) : undefined),
      [data]
    ),
    mutate,
    isLoading: !data && !error,
  };
}
