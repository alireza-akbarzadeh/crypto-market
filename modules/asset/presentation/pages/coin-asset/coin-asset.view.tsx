import { UserInterface } from "@/modules/auth/domain/entities/user";
import NotUserAssetComponent from "../../components/not-user-asset";
import styles from "./coin-asset.module.scss";
import {
  Button,
  Container,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  Divider,
  Skeleton,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import AppHeaderComponent from "@/core/components/layouts/app-header";
import { currencyFormat } from "@/core/helpers";
import SafeViewComponent from "@/core/components/layouts/safe-view";
import ArrowUpIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDownIcon from "@mui/icons-material/ArrowDropDownRounded";
import ArrowBackIcon from "@mui/icons-material/ArrowForwardRounded";
import BackIcon from "@mui/icons-material/ArrowForwardIos";
import AddIcon from "@mui/icons-material/ControlPointRounded";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import { fixedRowBuilder } from "@/core/components/common/infinite-list";
import TradeItemComponent from "../../components/trade-item";
import LoadingComponent from "@/core/components/common/loading";
import { AssetItemsInterface } from "@/modules/asset/domain/entities/asset";
import clsx from "clsx";
import CoinLineChartComponent from "@/modules/coin/presentation/components/coin-line-chart";

type PropTypes = {
  user?: UserInterface;
  handleOpenModal: () => void;
  onDelete: () => void;
  userLoading: boolean;
  data?: AssetItemsInterface;
  shouldLoadChart: boolean;
};
export default function CoinAssetView(props: PropTypes) {
  const {
    user,
    handleOpenModal,
    userLoading,
    data,
    onDelete,
    shouldLoadChart,
  } = props;
  // const data = undefined;

  const isProfit = (data?.asset.profit.amount || 0) > 0;
  const isLoss = (data?.asset.profit.amount || 0) < 0;
  if (!user) return <NotUserAssetComponent />;

  return (
    <div className={styles.root}>
      <div className={styles.headerWrapper}>
        <AppHeaderComponent
          className={styles.header}
          title="جزئیات دارایی"
          backHref="/portfolio"
        />
        <Container className={styles.headerDesc}>
          <Typography className={styles.title} component="h1">
            {data ? (
              <>
                <span>دارایی</span> {data.asset.currency.faName}
              </>
            ) : (
              <Skeleton width={100} />
            )}
          </Typography>
          {/* <Typography className={styles.subtitle}>
            دارایی ها بر اساس سفارش‌های شما نمایش داده می‌شود
          </Typography> */}
        </Container>
      </div>
      <Container className={styles.container}>
        <SafeViewComponent>
          <div className={styles.paper}>
            <Toolbar className={styles.paperHeader}>
              <Link href="/portfolio">
                <Button
                  component="a"
                  className="desktop-up"
                  startIcon={<ArrowBackIcon />}
                  variant="outlined"
                  color="inherit"
                >
                  بازگشت
                </Button>
              </Link>
              {/* <Link href="/portfolio">
                <IconButton
                  component="a"
                  className={styles.backBtn}
                  edge="start"
                >
                  <BackIcon />
                </IconButton>
              </Link>
              <Typography className={styles.title}>جزئیات دارایی</Typography> */}
            </Toolbar>
            <div className={styles.content}>
              <Grid container spacing={{ xs: 2.5, md: 5 }}>
                <Grid item xs={12} md={6} lg={4}>
                  <div className={styles.summeryWrapper}>
                    <div className={styles.logo}>
                      {data ? (
                        <Image
                          src={data.asset.currency.icon}
                          width={48}
                          height={48}
                        />
                      ) : (
                        <Skeleton variant="circular" width={48} height={48} />
                      )}
                    </div>
                    <Typography className={styles.name}>
                      {data ? (
                        data.asset.currency.faName
                      ) : (
                        <Skeleton width={80} />
                      )}
                    </Typography>
                    <Typography className={styles.shortName}>
                      {data ? (
                        data.asset.currency.shortName
                      ) : (
                        <Skeleton width={48} />
                      )}
                    </Typography>
                    {Boolean(data) && (
                      <Button
                        startIcon={<DeleteIcon />}
                        className={styles.deleteBtn}
                        color="error"
                        onClick={onDelete}
                      >
                        حذف
                      </Button>
                    )}
                    <div className={styles.row}>
                      <Typography component="div" className={styles.label}>
                        {data ? "مقدار:" : <Skeleton width={38} />}
                      </Typography>
                      <Typography component="div" className={styles.value}>
                        {data ? (
                          <>
                            {currencyFormat(data.asset.totalAmount)}{" "}
                            <span>{data.asset.currency.faName}</span>
                          </>
                        ) : (
                          <Skeleton width={80} />
                        )}
                      </Typography>
                    </div>
                    <Divider />
                    <div className={styles.row}>
                      <Typography component="div" className={styles.label}>
                        {data ? "کل هزینه:" : <Skeleton width={80} />}
                      </Typography>
                      <Typography component="div" className={styles.value}>
                        {data ? (
                          <>
                            {currencyFormat(data.asset.totalCost)}{" "}
                            <span>تومان</span>
                          </>
                        ) : (
                          <Skeleton width={120} />
                        )}
                      </Typography>
                    </div>
                    <Divider />
                    <div className={styles.row}>
                      <Typography component="div" className={styles.label}>
                        {data ? "ارزش به تومان:" : <Skeleton width={80} />}
                      </Typography>
                      <Typography component="div" className={styles.value}>
                        {data ? (
                          <>
                            {currencyFormat(data.asset.currentValue)}{" "}
                            <span>تومان</span>
                          </>
                        ) : (
                          <Skeleton width={120} />
                        )}
                      </Typography>
                    </div>
                    <Divider />
                    <div className={styles.row}>
                      <Typography component="div" className={styles.label}>
                        {data ? (
                          isProfit ? (
                            "سود:"
                          ) : isLoss ? (
                            "ضرر:"
                          ) : (
                            "سود و ضرر:"
                          )
                        ) : (
                          <Skeleton width={70} />
                        )}
                      </Typography>
                      <Typography component="div" className={styles.value}>
                        {data ? (
                          <div
                            className={clsx({
                              [styles.changes]: true,
                              [styles.profit]: isProfit,
                              [styles.loss]: isLoss,
                            })}
                          >
                            <>
                              <Typography
                                className={styles.amount}
                                component="span"
                              >
                                ٪ {Math.abs(data.asset.profit.percentage)}
                              </Typography>
                              {/* {isProfit && (
                                <ArrowUpIcon className={styles.icon} />
                              )}
                              {isLoss && (
                                <ArrowDownIcon className={styles.icon} />
                              )} */}
                              <Typography component="span">|</Typography>
                              <Typography
                                className={styles.amount}
                                component="span"
                              >
                                {currencyFormat(
                                  Math.abs(data.asset.profit.amount)
                                )}
                              </Typography>
                              <Typography variant="body2" component="span">
                                تومان
                              </Typography>
                            </>
                          </div>
                        ) : (
                          <Skeleton width={150} />
                        )}
                      </Typography>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} md={6} lg={8} className="desktop-up">
                  <div className={styles.chartWrapper}>
                    <Typography color="text.secondary" variant="h6">
                      تغییرات
                    </Typography>
                    <div className={styles.chart}>
                      {data && shouldLoadChart ? (
                        <CoinLineChartComponent
                          coin={data.asset.currency.shortName}
                        />
                      ) : null}
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className={styles.tradesSection}>
                    <div className={styles.head}>
                      <Typography className={styles.title}>مبادلات</Typography>
                      <Button
                        onClick={() => handleOpenModal()}
                        startIcon={<AddIcon />}
                      >
                        افزودن مبادله جدید
                      </Button>
                    </div>
                    <div className={styles.tradesTable}>
                      <div className={styles.tableHeader}>
                        <Typography component="div" className={styles.cell}>
                          نوع
                        </Typography>
                        <Typography component="div" className={styles.cell}>
                          مقدار
                        </Typography>
                        <Typography component="div" className={styles.cell}>
                          ارزش به تومان
                        </Typography>
                        <Typography component="div" className={styles.cell}>
                          سود و ضرر
                        </Typography>
                        <Typography component="div" className={styles.cell}>
                          ویرایش
                        </Typography>
                      </div>
                      {data
                        ? data.assets.map((item) => (
                            <TradeItemComponent
                              key={item.id}
                              data={item}
                              onEdit={handleOpenModal}
                            />
                          ))
                        : Array(5)
                            .fill("")
                            .map((_, i) => <TradeItemComponent key={i} />)}
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
        </SafeViewComponent>
      </Container>
    </div>
  );
}
