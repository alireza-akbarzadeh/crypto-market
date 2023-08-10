import { useErrorHandler } from "@/core/hooks";
import { NotificationsPageInterfaceItemChannel } from "@/modules/notifications/domain/entities/notifications";
import changeNotificationChannelStatus from "@/modules/notifications/domain/usecases/changeNotificationChannelStatus";
import { useEffect, useState } from "react";
import NotificationListItemView from "./notification-list-item.view";

type PropTypes = {
  data: NotificationsPageInterfaceItemChannel;
  category: string;
  mutate: () => void;
};
export default function NotificationListItemComponent(props: PropTypes) {
  const { data, category, mutate } = props;
  const [tempActive, setTempActive] = useState();
  const errorHandler = useErrorHandler();

  useEffect(() => {
    setTempActive(undefined);
  }, [data?.active]);

  const toggleStatus = async (e: any) => {
    if (!data || !category) return;
    const { checked } = e.target;
    setTempActive(checked);
    const { error } = await changeNotificationChannelStatus(
      category,
      data.channel,
      checked
    );
    if (error) {
      errorHandler(error);
      return;
    }
    mutate?.();
  };

  return (
    <NotificationListItemView
      data={data}
      toggleStatus={toggleStatus}
      tempActive={tempActive}
    />
  );
}
