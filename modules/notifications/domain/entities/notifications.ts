export interface NotificationsPageInterfaceItemChannel {
  channel: string;
  faName: string;
  enName: string;
  description?: string;
  active: boolean;
  webSupport?: boolean;
}
export interface NotificationsPageInterfaceItem {
  title: string;
  notificationCategory: string;
  imageUrl?: string;
  channels: NotificationsPageInterfaceItemChannel[];
}
export interface NotificationsPageInterface {
  isTgActive: boolean;
  items: NotificationsPageInterfaceItem[];
}
