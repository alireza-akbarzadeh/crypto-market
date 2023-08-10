import { Notification_2LineIcon } from "@/core/components/common/remixicons";
import AppHeaderComponent from "@/core/components/layouts/app-header";
import { NotificationsPageInterface } from "@/modules/notifications/domain/entities/notifications";
import TelegramIcon from "@mui/icons-material/Telegram";
import { Button, Container, List, Typography } from "@mui/material";
import NotificationListItemComponent from "../../components/notification-list-item";
import styles from "./notifications.module.scss";

type PropTypes = {
  data?: NotificationsPageInterface;
  mutate: () => void;
  disconnectTelegram: () => void;
};
export default function NotificationsView(props: PropTypes) {
  const { data, mutate, disconnectTelegram } = props;

  return (
    <div className={styles.root}>
      <AppHeaderComponent title="اعلان‌ها و هشدار‌ها" backHref="/profile" />
      <Container maxWidth="sm">
        {data ? (
          <div className={styles.telegramPaper}>
            <Typography className={styles.desc}>
              {data.isTgActive
                ? "ربات تلگرام برای شما فعال شد"
                : "برای دریافت اعلان‌ها از ربات تلگرام باید ابتدا آن را فعال کنید."}
            </Typography>
            {data.isTgActive ? (
              <Button fullWidth variant="outlined" onClick={disconnectTelegram}>
                غیر فعال کردن
              </Button>
            ) : (
              <Button
                component="a"
                href="https://t.me/crypto_bot?start=v1"
                rel="noopener noreferrer"
                target="_blank"
                fullWidth
                className={styles.btn}
                variant="contained"
                startIcon={<TelegramIcon />}
              >
                فعالسازی ربات تلگرام
              </Button>
            )}
          </div>
        ) : null}
      </Container>
      {data?.items?.map((item) => (
        <div
          className={styles.notificationCategory}
          key={item.notificationCategory}
        >
          <Container maxWidth="sm">
            <div className={styles.categoryHeader}>
              <div className={styles.iconWrapper}>
                {item.imageUrl ? (
                  <img src={item.imageUrl} />
                ) : (
                  <Notification_2LineIcon />
                )}
              </div>
              <Typography
                component="h4"
                color="text.secondary"
                fontWeight={500}
              >
                {item.title}
              </Typography>
            </div>
            <List>
              {item.channels.map((channel) => (
                <NotificationListItemComponent
                  key={channel.channel}
                  category={item.notificationCategory}
                  data={channel}
                  mutate={mutate}
                />
              ))}
            </List>
          </Container>
        </div>
      ))}
    </div>
  );
}
