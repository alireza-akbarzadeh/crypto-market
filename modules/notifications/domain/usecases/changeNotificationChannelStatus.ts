import { changeNotificationChannelStatusDS } from "../../data/datasources/notifications.datasource";

export default async function changeNotificationChannelStatus(
  notificationCategory: string,
  channel: string,
  status: boolean
) {
  const { result, error, success } = await changeNotificationChannelStatusDS({
    notificationCategory,
    channel,
    status,
  });
  if (!success) return { error };
  return { data: result };
}
