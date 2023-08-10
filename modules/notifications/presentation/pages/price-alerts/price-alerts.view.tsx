import AppHeaderComponent from "@/core/components/layouts/app-header";
import styles from "./price-alerts.module.scss";
import EMPTY_DATA from "@/public/images/profile/notif_empty.svg";
import Image from "next/image";
import { Button, Container, Typography } from "@mui/material";
import { PriceAlertGroup } from "@/modules/notifications/domain/entities/priceAlerts";
import PriceAlertListItemComponent from "../../components/price-alert-list-item";
import Link from "next/link";
import PriceAlertListHeaderComponent from "../../components/price-alert-list-header";
import { CoinDataInterface } from "@/modules/coin/domain/entities/coin";
import LoadingComponent from "@/core/components/common/loading";
import { UserInterface } from "@/modules/auth/domain/entities/user";
import UnauthenticatedContentComponent from "@/core/components/layouts/unauthenticated-content";

type PropTypes = {
  data: PriceAlertGroup[];
  mutate: () => void;
  onMore: (id: string) => void;
  openCreateAlert: () => void;
  setSelectedCoin: (coin: CoinDataInterface) => void;
  isLoading: boolean;
  user?: UserInterface;
};
export default function PriceAlertsView(props: PropTypes) {
  const {
    data,
    mutate,
    onMore,
    openCreateAlert,
    setSelectedCoin,
    isLoading,
    user,
  } = props;
  if (!user)
    return (
      <UnauthenticatedContentComponent title="گوش به زنگ" backHref="/">
        با اضافه کردن هشدار، از رشد یا سقوط ارز خود در لحظه مطلع شوید.
      </UnauthenticatedContentComponent>
    );
  return (
    <div className={styles.root}>
      <AppHeaderComponent title="گوش به زنگ" backHref="/profile" />
      <Container className={styles.container} maxWidth="sm">
        {isLoading ? (
          <LoadingComponent page />
        ) : !data.length ? (
          <section className={styles.emptyData}>
            <Image src={EMPTY_DATA} />
            <Typography component={"h2"} className={styles.boldText}>
              هیچ هشداری ندارید
            </Typography>
            <Typography className={styles.text}>
              هشدار اضافه کنید تا رشد زیاد یا سقوط را از دست ندهید.
            </Typography>
          </section>
        ) : (
          <>
            <Typography component="h2" className={styles.title}>
              هشدارها
            </Typography>
            <div className={styles.groupList}>
              {data.map((group) => (
                <div key={group.coinId} className={styles.currencies}>
                  <PriceAlertListHeaderComponent
                    data={group}
                    setSelectedCoin={setSelectedCoin}
                  />
                  <div className={styles.notificationList}>
                    {group.alerts.map((alert) => (
                      <PriceAlertListItemComponent
                        key={alert.id}
                        data={alert}
                        onMore={onMore}
                        mutate={mutate}
                      />
                    ))}
                    {Boolean(group.hasMore) && (
                      <Link href={"/price-alert/" + group.shortName} passHref>
                        <Button component="a" fullWidth>
                          مشاهده {group.hasMore} مورد دیگر
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </Container>
      <div className={styles.addButtonWrapper}>
        <Container maxWidth="sm">
          <Button variant="contained" onClick={openCreateAlert} fullWidth>
            افزودن هشدار
          </Button>
        </Container>
      </div>
    </div>
  );
}
