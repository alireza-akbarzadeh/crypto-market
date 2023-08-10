import {
  NotificationsPageInterface,
  NotificationsPageInterfaceItem,
  NotificationsPageInterfaceItemChannel,
} from "../../domain/entities/notifications";

function notificationItemChannelModelMapper(
  data: any
): NotificationsPageInterfaceItemChannel {
  const { channel, faName, enName, description, active, webSupport } = data;
  return {
    channel,
    faName,
    enName,
    description,
    active,
    webSupport,
  };
}
function notificationItemModelMapper(
  data: any
): NotificationsPageInterfaceItem {
  const { title, notificationCategory, imageUrl, channels } = data;
  return {
    title,
    notificationCategory,
    imageUrl,
    channels: channels.map(notificationItemChannelModelMapper),
  };
}

export default function notificationsModelMapper(
  data: any
): NotificationsPageInterface {
  const { isTgActive, items } = data;
  return { isTgActive, items: items?.map(notificationItemModelMapper) };
}
