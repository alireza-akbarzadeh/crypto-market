import styles from "./home.module.scss";
import { Container, Grid, Typography } from "@mui/material";
import WhyUsComponent from "../../components/why-us";
import KycAlertComponent from "../../components/kyc-alert";
import CryptoServicesComponent from "../../components/crypto-services";
import LivePriceMinimalComponent from "../../components/live-price-minimal";
import NewsComponent from "../../components/news";
import BitgapComponent from "../../components/bitgap";
import CommentsComponent from "../../components/comments";
import CRYPTO_COINS from "@/public/images/crypto-coins.png";
import PRICES_LIGHT from "@/public/images/prices-light.png";
import PRICES_DARK from "@/public/images/prices-dark.png";
import Image from "next/image";
import { useSelector, useTokenRoute } from "@/core/hooks";
import DownloadAppComponent from "@/modules/app-properties/presentation/components/download-app";
import AppFooterComponent from "@/core/components/layouts/app-footer";
import TradeComponent from "../../components/trade";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import HomeHeaderComponent from "../../components/home-header";
import { HomeDataInterface } from "@/modules/home/domain/entities/home";
import Link from "next/link";
import clsx from "clsx";
import AppBottomNavComponent from "@/core/components/layouts/app-bottom-nav";
// import AnalysisComponent from "../../components/analysis";
import dynamic from "next/dynamic";
const AnalysisComponent = dynamic(() => import("../../components/analysis"), {
  ssr: false,
});
import HomeAdComponent from "../../components/home-ad";

type PropTypes = { data: HomeDataInterface; coinsData?: any };
export default function HomeView(props: PropTypes) {
  const { data, coinsData } = props;
  const { isDarkTheme } = useSelector((s) => s.app);
  const tokenRoute = useTokenRoute();

  return (
    <div className={styles.root}>
      <HomeHeaderComponent />
      <div className="desktop-up">
        <TradeComponent coinsFallback={coinsData} scrollable />
        <WhyUsComponent />
      </div>
      <div className={clsx(styles.swiperSection, "desktop-down")}>
        <Container>
          <div className={styles.bannerSwiperContainer}>
            <Swiper
              pagination={true}
              modules={[Pagination, Autoplay]}
              className={styles.swiper}
              loop
              autoplay
            >
              {data.carousel.map((slide, idx) => {
                const content = (
                  <img className={styles.image} src={slide.imageUrl} alt="" />
                );

                return (
                  <SwiperSlide key={idx}>
                    {!slide.action ? (
                      <div className={styles.imageWrapper}>{content}</div>
                    ) : slide.action.type === "deeplink" ? (
                      <Link
                        href={
                          slide.action.hasAuthentication
                            ? tokenRoute(slide.action.route)
                            : slide.action.route
                        }
                        passHref
                      >
                        <a className={styles.imageWrapper}>{content}</a>
                      </Link>
                    ) : slide.action.type === "webview" ? (
                      <a
                        className={styles.imageWrapper}
                        href={slide.action.route}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {content}
                      </a>
                    ) : null}
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </Container>
      </div>
      <CryptoServicesComponent data={data.services} />
      <HomeAdComponent />
      <LivePriceMinimalComponent data={data.currencies} />
      <AnalysisComponent data={data.analysis} />
      <NewsComponent data={data.news} />
      <BitgapComponent data={data.gaps} />
      <CommentsComponent data={data.comments} />

      <div className="desktop-up">
        <Container className={styles.powers}>
          <Grid container alignItems="center">
            <Grid item xs={12} md={6}>
              <Image
                className={styles.coinsImage}
                src={CRYPTO_COINS}
                width={487}
                height={487}
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <Typography color="warning.main" component="h4">
                تنوع ارز‌ها
              </Typography>
              <Typography component="h4" className={styles.title}>
                هر ارزی که فکرش رو کنی ما داریم!
              </Typography>
              <Typography>
                ما بیش‌ از ۳۰۰ نوع ارز داریم که هیچگونه محدودیتی برای خرید و
                فروششون نداریم پس با خیال راحت می‌تونین روی ارز‌ها سرمایه گذاری
                کنین.
              </Typography>
            </Grid>
            <Grid item xs={12} md={5} sx={{ ml: "auto" }}>
              <Typography color="success.main" component="h4">
                قیمت لحظه‌ای
              </Typography>
              <Typography component="h4" className={styles.title}>
                قیمت‌ها رو لحظه‌ای بررسی کنین
              </Typography>
              <Typography>
                با اپلیکیشن بیت‌برگ، از قیمت‌ها آگاه باش تا از بازار جا نمونی
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              {isDarkTheme ? (
                <Image src={PRICES_DARK} width={487} height={487} />
              ) : (
                <Image src={PRICES_LIGHT} width={487} height={487} />
              )}
            </Grid>
          </Grid>
        </Container>
        <Container className={styles.download}>
          <DownloadAppComponent />
        </Container>
        <AppFooterComponent />
        <div className={styles.fixedAlert}>{<KycAlertComponent />}</div>
      </div>
      <AppBottomNavComponent />
      {/* <BottomNavigation sx={{ opacity: 0, zIndex: -1 }} /> */}
    </div>
  );
}
