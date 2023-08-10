import EmptyContentComponent from "@/core/components/common/empty-content";
import InfiniteListComponent, {
  fixedRowBuilder,
} from "@/core/components/common/infinite-list";
import LoadingComponent from "@/core/components/common/loading";
import AppHeaderComponent from "@/core/components/layouts/app-header";
import UnauthenticatedContentComponent from "@/core/components/layouts/unauthenticated-content";
import { UserInterface } from "@/modules/auth/domain/entities/user";
import { CoinDataInterface } from "@/modules/coin/domain/entities/coin";
import useCoinNotifications from "@/modules/notifications/domain/usecases/useCoinNotifications";
import { Button, Container } from "@mui/material";
import { MutableRefObject } from "react";
import PriceAlertListHeaderComponent from "../../components/price-alert-list-header";
import PriceAlertListItemComponent from "../../components/price-alert-list-item";
import styles from "./coin-alerts.module.scss";

type PropTypes = {
  coin: string;
  onMore: (id: string) => void;
  openCreateAlert: () => void;
  setSelectedCoin: (coin: CoinDataInterface) => void;
  user?: UserInterface;
};
export default function CoinAlertsView(props: PropTypes) {
  const { coin, onMore, openCreateAlert, setSelectedCoin, user } = props;
  if (!user)
    return (
      <UnauthenticatedContentComponent title="گوش به زنگ" backHref="/">
        با اضافه کردن هشدار، از رشد یا سقوط ارز خود در لحظه مطلع شوید.
      </UnauthenticatedContentComponent>
    );
  return (
    <InfiniteListComponent
      {...{
        pageSize: 10,
        getHook: useCoinNotifications,
        params: { coin },
        getItemData: (rows, _meta, mutate) => ({ rows, onMore, mutate }),
        itemSize: 75,
        // itemSize: isDesktopSize ? 82 : 218,
        Row,
        revalidateOnMount: true,
      }}
    >
      {({ List, rows, isLoading, error, meta }) => (
        <div className={styles.root}>
          <AppHeaderComponent title="هشدار ها" backHref="/price-alert" />
          <Container maxWidth="sm">
            <div className={styles.wrapper}>
              <PriceAlertListHeaderComponent
                data={meta.currency}
                setSelectedCoin={setSelectedCoin}
              />
              {!error && List}
              {Boolean(!rows.length && !isLoading) && (
                <EmptyContentComponent message="هشداری یافت نشد." />
              )}
              <LoadingComponent loading={isLoading} />
            </div>
          </Container>
          {/* <div className={styles.addButtonWrapper}>
            <Container>
              <Button variant="contained" onClick={openCreateAlert} fullWidth>
                افزودن هشدار
              </Button>
            </Container>
          </div> */}
        </div>
      )}
    </InfiniteListComponent>
  );
}

const Row = fixedRowBuilder(({ index, style, data }) => {
  const { rows, onMore, mutate } = data;
  return (
    <div className={styles.listItemWrapper} style={style}>
      <PriceAlertListItemComponent
        data={rows[index]}
        onMore={onMore}
        mutate={mutate}
      />
    </div>
  );
});
