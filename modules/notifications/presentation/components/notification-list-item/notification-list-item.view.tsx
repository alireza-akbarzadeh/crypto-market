import styles from "./notification-list-item.module.scss";
import { ListItem, ListItemText, Switch } from "@mui/material";
import { NotificationsPageInterfaceItemChannel } from "@/modules/notifications/domain/entities/notifications";

type PropTypes = {
  data: NotificationsPageInterfaceItemChannel;
  toggleStatus: (e: any) => void;
  tempActive?: boolean;
};
export default function NotificationListItemView(props: PropTypes) {
  const { data, toggleStatus, tempActive } = props;
  if (data.webSupport === false) return null;
  return (
    <ListItem className={styles.root} disablePadding>
      <ListItemText>{data.faName}</ListItemText>
      <Switch
        onChange={toggleStatus}
        checked={tempActive ?? data.active}
        disabled={tempActive != null}
      />
    </ListItem>
  );
}
