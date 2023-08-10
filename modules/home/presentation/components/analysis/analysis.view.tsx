import { PresentationChartIcon } from "@/core/components/common/custom-icon";
import { useIsMobileSize, useTokenRoute } from "@/core/hooks";
import { HomeDataInterface } from "@/modules/home/domain/entities/home";
import { Button, ButtonBase, Container, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import styles from "./analysis.module.scss";
import clsx from "clsx";

type PropTypes = {
  data: HomeDataInterface["analysis"];
};
export default function AnalysisView(props: PropTypes) {
  const { data } = props;
  const tokenRoute = useTokenRoute();

  const renderStrategies = data.strategies.items.map((item) => (
    <SwiperSlide key={item.url}>
      <ButtonBase
        component="a"
        target="_blank"
        rel="noopener noreferrer"
        href={item.url}
        className={styles.strategyCard}
        key={item.url}
      >
        <div className={styles.image}>
          <img src={item.image} />
        </div>
        <div>
          <Typography color="text.secondary" component="div">
            {item.title}
          </Typography>
          <Typography fontWeight={500} variant="h6" component="div">
            {item.subtitle}
          </Typography>
        </div>
      </ButtonBase>
    </SwiperSlide>
  ));

  const renderSimilarAssets = data.similarAssets.items.map((item) => (
    <SwiperSlide key={item.url}>
      <ButtonBase
        component="a"
        target="_blank"
        rel="noopener noreferrer"
        href={item.url}
        className={styles.similarAssetCard}
        key={item.url}
      >
        <div className={styles.image}>
          <img src={item.image} />
        </div>
        <Typography color="text.secondary" component="div">
          {item.title}
        </Typography>
        <Typography fontWeight={500} variant="h6" component="div">
          {item.subtitle}
        </Typography>
      </ButtonBase>
    </SwiperSlide>
  ));

  return (
    <div className={styles.root}>
      <Container>
        <div className={styles.paper}>
          <div className={styles.header}>
            <PresentationChartIcon className={styles.icon} />
            <div>
              <Typography className={styles.title} component="h2">
                تحلیل
              </Typography>
            </div>
          </div>
          <div className={clsx(styles.bannerSwiperContainer, "mobile-down")}>
            <Swiper
              modules={[Pagination, Autoplay]}
              className={styles.swiper}
              pagination={data.carousel.length > 1}
              autoplay={data.carousel.length > 1}
              loop={data.carousel.length > 1}
            >
              {data.carousel.map((slide, idx) =>
                slide.action ? (
                  <SwiperSlide key={idx}>
                    <a
                      className={styles.imageWrapper}
                      href={slide.action.route}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <img
                        className={styles.image}
                        src={slide.imageUrl}
                        alt=""
                      />
                    </a>
                  </SwiperSlide>
                ) : (
                  <SwiperSlide key={idx}>
                    <div className={styles.imageWrapper}>
                      <img
                        className={styles.image}
                        src={slide.imageUrl}
                        alt=""
                      />
                    </div>
                  </SwiperSlide>
                )
              )}
            </Swiper>
          </div>
          <div className={styles.header}>
            <div>
              <Typography className={styles.title} component="h2">
                استراتژی‌ها
              </Typography>
            </div>
            {Boolean(data.strategies.action) && (
              <Button
                component="a"
                href={
                  data.strategies.action!.hasAuthentication
                    ? tokenRoute(data.strategies.action!.route)
                    : data.strategies.action!.route
                }
              >
                نمایش همه
              </Button>
            )}
          </div>
          <div className={styles.listWrapper}>
            <Swiper
              className={clsx(styles.slidingSwiper, "mobile-down")}
              spaceBetween={10}
              modules={[Autoplay]}
              loop
              speed={10000}
              pagination={{
                clickable: true,
              }}
              autoplay={{
                delay: 1,
                disableOnInteraction: false,
              }}
              slidesPerView={1.16}
            >
              {renderStrategies}
            </Swiper>
            <Swiper
              className={clsx(styles.slidingSwiper, "mobile-up")}
              spaceBetween={10}
              loop
              slidesPerView={1.5}
              breakpoints={{
                900: {
                  slidesPerView: 2.5,
                },
                1200: {
                  slidesPerView: 3,
                },
              }}
            >
              {renderStrategies}
            </Swiper>
          </div>
          <div className={styles.header}>
            <div>
              <Typography className={styles.title} component="h2">
                شبیه‌ترین ارزها
              </Typography>
            </div>
            {Boolean(data.similarAssets.action) && (
              <Button
                component="a"
                href={
                  data.similarAssets.action!.hasAuthentication
                    ? tokenRoute(data.similarAssets.action!.route)
                    : data.similarAssets.action!.route
                }
              >
                نمایش همه
              </Button>
            )}
          </div>
          <div className={styles.listWrapper}>
            <Swiper
              className={clsx(styles.slidingSwiper, "mobile-down")}
              modules={[Autoplay]}
              spaceBetween={10}
              loop
              speed={10000}
              pagination={{
                clickable: true,
              }}
              autoplay={{
                delay: 1,
                disableOnInteraction: false,
                reverseDirection: true,
              }}
              slidesPerView={2.44}
            >
              {renderSimilarAssets}
            </Swiper>
            <Swiper
              className={clsx(styles.slidingSwiper, "mobile-up")}
              spaceBetween={10}
              loop
              slidesPerView={4}
              breakpoints={{
                900: {
                  slidesPerView: 5,
                },
              }}
            >
              {renderSimilarAssets}
            </Swiper>
          </div>
          {/* <div className={styles.listWrapper}>
            <div className={styles.list}>
              {data.similarAssets.items.map((item) => (
                <ButtonBase
                  component="a"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={item.url}
                  className={styles.similarAssetCard}
                  key={item.url}
                >
                  <div className={styles.image}>
                    <img src={item.image} />
                  </div>
                  <Typography color="text.secondary" component="div">
                    {item.title}
                  </Typography>
                  <Typography fontWeight={500} variant="h6" component="div">
                    {item.subtitle}
                  </Typography>
                </ButtonBase>
              ))}
            </div>
          </div> */}
        </div>
      </Container>
    </div>
  );
}
