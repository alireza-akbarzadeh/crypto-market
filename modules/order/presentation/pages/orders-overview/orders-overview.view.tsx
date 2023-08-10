import TabsComponent from "@/core/components/common/tabs";
import AppHeaderComponent from "@/core/components/layouts/app-header";
import { OrderDateSpan, OrderType } from "@/core/enums/order.enums";
import { currencyFormat } from "@/core/helpers";
import { useIsDesktopSize } from "@/core/hooks";
import AssetChartComponent from "@/modules/asset/presentation/components/asset-chart";
import useOrdersOverview from "@/modules/order/domain/usecases/useOrdersOverview";
import {
  Button,
  Container,
  Grid,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import clsx from "clsx";
import { useState } from "react";
import styles from "./orders-overview.module.scss";
import ArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Image from "next/image";
import CoinSingleIcon from "@/core/components/common/custom-icon/coin-single";
import useOrdersOverviewAll from "@/modules/order/domain/usecases/useOrdersOverviewAll";
import UnauthenticatedContentComponent from "@/core/components/layouts/unauthenticated-content";
import { UserInterface } from "@/modules/auth/domain/entities/user";
import LoadingComponent from "@/core/components/common/loading";
import EmptyContentComponent from "@/core/components/common/empty-content";

type PropTypes = {
  orderType: OrderType;
  setOrderType: (o: OrderType) => void;
  dateSpan: OrderDateSpan;
  setDateSpan: (o: OrderDateSpan) => void;
  user?: UserInterface;
};
export default function OrdersOverviewView(props: PropTypes) {
  const { orderType, setOrderType, dateSpan, setDateSpan, user } = props;
  const isDesktopSize = useIsDesktopSize();
  const { data, coinsFallback } = useOrdersOverview(orderType, dateSpan);
  const { data: allCoins } = useOrdersOverviewAll(orderType, dateSpan, {
    fallbackData: coinsFallback,
  });
  const [showAllCoins, setShowAllCoins] = useState(false);

  if (!user)
    return (
      <UnauthenticatedContentComponent title="نمای کلی سفارشات" backHref="/">
        در این بخش می‌توانید وضعیت سفارشات خود را مشاهده کنید.
      </UnauthenticatedContentComponent>
    );

  const coins = showAllCoins ? allCoins : data?.currencies;
  const dateSpanContent = (
    <ToggleButtonGroup
      color="standard"
      value={dateSpan}
      exclusive
      onChange={(_, val) => {
        if (val !== null) setDateSpan(val);
      }}
      fullWidth
      size="small"
      className={styles.buttonGroup}
    >
      <ToggleButton value={OrderDateSpan.CurrentMonth}>ماه جاری</ToggleButton>
      <ToggleButton value={OrderDateSpan.Last6Months}>۶ ماهه</ToggleButton>
      <ToggleButton value={OrderDateSpan.AllTimes}>تمام مدت</ToggleButton>
    </ToggleButtonGroup>
  );
  return (
    <div className={styles.root}>
      <AppHeaderComponent title="نمای کلی سفارشات" backHref="/orders" />
      <div className={styles.topSection}>
        <Container>
          <Typography
            className="mobile-up"
            component="h1"
            fontWeight={700}
            variant="h5"
          >
            نمای کلی سفارشات
          </Typography>
          <Stack
            sx={{ mb: 2, mt: 4 }}
            direction="row"
            justifyContent="space-between"
            className="mobile-up"
          >
            {dateSpanContent}
            <ToggleButtonGroup
              color="standard"
              value={orderType}
              exclusive
              onChange={(_, val) => {
                if (val !== null) setOrderType(val);
              }}
              size="small"
              className={styles.buttonGroup}
            >
              <ToggleButton value={OrderType.Buy}>خرید</ToggleButton>
              <ToggleButton value={OrderType.Sell}>فروش</ToggleButton>
            </ToggleButtonGroup>
          </Stack>
          <Grid container spacing={4}>
            <Grid className="mobile-up" item xs={12} sm={6} md={4}>
              <div className={styles.paper}>
                <Typography className={styles.title} component="h3">
                  مجموع خرید
                </Typography>
                <Typography component="div" className={styles.listItem}>
                  <div className={styles.label}>سفارش‌ها:</div>
                  <div className={styles.value}>
                    {currencyFormat(data?.count)} <span>عدد</span>
                  </div>
                </Typography>
                <Typography component="div" className={styles.listItem}>
                  <div className={styles.label}>مبلغ:</div>
                  <div className={styles.value}>
                    {currencyFormat(data?.totalPrice)} <span>تومان</span>
                  </div>
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={8}>
              <div className={styles.paper}>
                <Typography className={styles.title} component="h3">
                  مجموع سفارش‌ها
                </Typography>
                <Typography component="div" className={styles.listItem}>
                  <div className={styles.label}>سفارش‌ها:</div>
                  <div className={styles.value}>
                    {currencyFormat(data?.summary.count)} <span>عدد</span>
                  </div>
                </Typography>
                <Typography component="div" className={styles.listItem}>
                  <div className={styles.label}>مبلغ:</div>
                  <div className={styles.value}>
                    {currencyFormat(data?.summary.sum)} <span>تومان</span>
                  </div>
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
      <div className={clsx("mobile-down", styles.filterSection)}>
        <Container>
          <TabsComponent
            items={[
              { value: OrderType.Buy, title: "خرید" },
              { value: OrderType.Sell, title: "فروش" },
            ]}
            active={orderType}
            onChange={(v) => setOrderType(v)}
            valueSelector={(i) => i.value}
            labelSelector={(i) => i.title}
          />
          <div className={styles.head}>{dateSpanContent}</div>
          <Typography component="div" className={styles.listItem}>
            <div className={styles.label}>مبلغ:</div>
            <div className={styles.value}>
              {currencyFormat(data?.totalPrice)} <span>تومان</span>
            </div>
          </Typography>
          <Typography component="div" className={styles.listItem}>
            <div className={styles.label}>مبلغ:</div>
            <div className={styles.value}>
              {currencyFormat(data?.count)} <span>عدد</span>
            </div>
          </Typography>
        </Container>
      </div>
      <Container>
        <Grid container columnSpacing={4} rowSpacing={3}>
          <Grid
            className={clsx({ "desktop-up": coins && !coins.length })}
            item
            xs={12}
            md={4}
            order={{ md: 1 }}
          >
            <div className={styles.chartSection}>
              <div className={styles.paper}>
                <Typography
                  variant="h6"
                  fontWeight={500}
                  className="desktop-down"
                  sx={{ mb: 2 }}
                >
                  فراوانی سفارش‌ها
                </Typography>

                {isDesktopSize || data?.pie.length ? (
                  <AssetChartComponent
                    total={data?.totalPrice}
                    pie={data?.pie}
                    mobileStyle
                    maxLength={4}
                  />
                ) : null}
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={8}>
            <div className={styles.listSection}>
              <div className={styles.paper}>
                <div className={styles.listHeader}>
                  <Typography>دارایی</Typography>
                  <Typography>تعداد سفارش</Typography>
                  <Typography>مبلغ</Typography>
                </div>
                {!coins ? (
                  <LoadingComponent />
                ) : !coins.length ? (
                  <EmptyContentComponent
                    sx={{ pt: 3 }}
                    message="سفارشی یافت نشد"
                  />
                ) : (
                  coins.map((c: any) => (
                    <div className={styles.listItem} key={c.enName}>
                      <div className={styles.nameSection}>
                        <Image src={c.icon} width={40} height={40} />
                        <div>
                          <Typography
                            component="div"
                            variant="h6"
                            fontWeight={500}
                          >
                            {c.faName}
                          </Typography>
                          <Typography component="span" color="text.secondary">
                            {c.shortName}
                          </Typography>
                        </div>
                      </div>
                      <div className={clsx(styles.count, "mobile-up")}>
                        <Typography
                          component="div"
                          variant="h6"
                          color="text.secondary"
                        >
                          {c.ordersCount}
                        </Typography>
                      </div>
                      <div className={styles.price}>
                        <Typography
                          component="div"
                          variant="h6"
                          fontWeight={500}
                        >
                          {currencyFormat(c.totalPrice)}{" "}
                          <Typography component="span" color="text.secondary">
                            تومان
                          </Typography>
                        </Typography>
                        <Typography
                          className="mobile-down"
                          component="div"
                          variant="h6"
                          color="text.secondary"
                        >
                          {c.ordersCount}{" "}
                          <Typography component="span" color="text.secondary">
                            سفارش
                          </Typography>
                        </Typography>
                      </div>
                    </div>
                  ))
                )}
                {Boolean(data?.othersCount) && (
                  <>
                    {!showAllCoins && (
                      <div className={clsx(styles.listItem, styles.more)}>
                        <div className={styles.nameSection}>
                          {/* <Image src={c.icon} width={40} height={40} /> */}
                          <div className={styles.iconWrapper}>
                            <CoinSingleIcon />
                          </div>
                          <div>
                            <Typography
                              component="div"
                              variant="h6"
                              fontWeight={500}
                            >
                              بقیه ارز‌ها
                            </Typography>
                            <Typography component="span" color="text.secondary">
                              Other
                            </Typography>
                          </div>
                        </div>
                        <div className={clsx(styles.count, "mobile-up")}>
                          <Typography
                            component="div"
                            variant="h6"
                            color="text.secondary"
                          >
                            {currencyFormat(data?.othersCount)}
                          </Typography>
                        </div>
                        <div className={styles.price}>
                          <Typography
                            component="div"
                            variant="h6"
                            fontWeight={500}
                          >
                            {currencyFormat(data?.othersTotalPrice)}{" "}
                            <Typography component="span" color="text.secondary">
                              تومان
                            </Typography>
                          </Typography>
                          <Typography
                            className="mobile-down"
                            component="div"
                            variant="h6"
                            color="text.secondary"
                          >
                            {data?.othersCount}{" "}
                            <Typography component="span" color="text.secondary">
                              سفارش
                            </Typography>
                          </Typography>
                        </div>
                      </div>
                    )}
                    <Button
                      onClick={() => setShowAllCoins((s) => !s)}
                      fullWidth
                      endIcon={
                        showAllCoins ? <ArrowUpIcon /> : <ArrowDownIcon />
                      }
                    >
                      {showAllCoins ? "بستن" : "مشاهده بیشتر"}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
