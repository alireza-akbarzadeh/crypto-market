import styles from "./asset.module.scss";
import { Button, Container, Skeleton, Typography } from "@mui/material";
import { UserInterface } from "@/modules/auth/domain/entities/user";
import AppHeaderComponent from "@/core/components/layouts/app-header";
import { currencyFormat } from "@/core/helpers";
import AssetChartComponent from "../../components/asset-chart";
import AssetTableComponent from "../../components/asset-table";
import SafeViewComponent from "@/core/components/layouts/safe-view";
import AddIcon from "@mui/icons-material/ControlPointRounded";
import clsx from "clsx";
import NotUserAssetComponent from "../../components/not-user-asset";
import LoadingComponent from "@/core/components/common/loading";
import { AssetSummeryInterface } from "@/modules/asset/domain/entities/asset";
import { useIsDesktopSize } from "@/core/hooks";

type PropTypes = {
  user?: UserInterface;
  isTop: boolean;
  userLoading: boolean;
  openAddModal: () => void;
  summeryData?: AssetSummeryInterface;
};
export default function AssetView(props: PropTypes) {
  const { user, isTop, openAddModal, userLoading, summeryData } = props;
  const isDesktopSize = useIsDesktopSize();

  const isLoss = (summeryData?.totalAssetProfit as any) < 0;

  if (!user) return <NotUserAssetComponent />;

  return (
    <div className={styles.root}>
      <div className={styles.headerWrapper}>
        <AppHeaderComponent
          // className={clsx({ [styles.header]: true, [styles.top]: isTop })}
          backHref="/"
          title="پورتفوی"
        />
        <Container className={styles.headerDesc}>
          <Typography className={styles.title} component="h1">
            پورتفوی
          </Typography>
          {/* <Typography className={styles.subtitle}>
            دارایی ها بر اساس سفارش‌های شما نمایش داده می‌شود
          </Typography> */}
        </Container>
      </div>
      <Container className={styles.container}>
        <SafeViewComponent>
          <div className={styles.headSection}>
            <div className={styles.totalSection}>
              <Typography className={styles.title} component="h3">
                ارزش کل دارایی
              </Typography>
              <div className={styles.value}>
                {summeryData ? (
                  <>
                    <Typography variant="h3" component="span" fontWeight={700}>
                      {currencyFormat(summeryData.totalAssetAmount)}
                    </Typography>
                    <Typography
                      variant="body2"
                      component="span"
                      color="text.secondary"
                      fontWeight={500}
                    >
                      {" "}
                      تومان
                    </Typography>
                  </>
                ) : (
                  <Skeleton width={120} />
                )}
              </div>
              <Typography
                className={styles.difference}
                component="span"
                color={isLoss ? "error.main" : "success.main"}
                fontWeight={500}
              >
                {summeryData ? (
                  summeryData.totalAssetProfit !== 0 ? (
                    <>
                      {isLoss ? "ضرر" : "سود"}:{" "}
                      <Typography component="span" fontWeight={700}>
                        {currencyFormat(Math.abs(summeryData.totalAssetProfit))}
                      </Typography>{" "}
                      تومان
                      {/* {isLoss ? <ArrowDownIcon /> : <ArrowUpIcon />} */}
                    </>
                  ) : null
                ) : (
                  <Skeleton width={120} />
                )}
              </Typography>
            </div>

            <div className={styles.chartSection}>
              {isDesktopSize || summeryData?.pie.length ? (
                <AssetChartComponent
                  total={summeryData?.totalAssetAmount}
                  pie={summeryData?.pie}
                />
              ) : null}
            </div>
          </div>
          <div className={styles.tableWrapper}>
            <div className={styles.header}>
              <Typography className={styles.title}>دارایی های من</Typography>
              <Button onClick={openAddModal} startIcon={<AddIcon />}>
                افزودن ارز جدید
              </Button>
            </div>
            <AssetTableComponent openAddModal={openAddModal} />
          </div>
        </SafeViewComponent>
      </Container>
    </div>
  );
}
