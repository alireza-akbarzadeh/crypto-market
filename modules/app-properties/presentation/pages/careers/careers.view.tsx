import styles from "./careers.module.scss";
import CAREERS from "@/public/images/careers.png";
// import CAREERS from "@/public/images/careers.svg";
import Image from "next/image";
import {
  Link,
  Container,
  Typography,
  Grid,
  Divider,
  IconButton,
  TextField,
  InputAdornment,
  Button,
  ButtonBase,
} from "@mui/material";
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  CareerCafeIcon,
  CareerEducationIcon,
  CareerFoodIcon,
  CareerGamesIcon,
  CareerGiftsIcon,
  CareerGrowIcon,
  SearchIcon,
} from "@/core/components/common/custom-icon";

import { Swiper, SwiperSlide } from "swiper/react";

// import Swiper core and required modules
import SwiperCore, { EffectCoverflow, Navigation } from "swiper";
// import CareerCollapseComponent from "../../components/career-collapse";
import NextIcon from "@mui/icons-material/ArrowBack";
import AppHeaderComponent from "@/core/components/layouts/app-header";

// install Swiper modules
SwiperCore.use([EffectCoverflow, Navigation]);

const images = [
  require("@/public/images/crypto-environment/01.jpg"),
  require("@/public/images/crypto-environment/02.jpg"),
  require("@/public/images/crypto-environment/03.jpg"),
  require("@/public/images/crypto-environment/04.jpg"),
  require("@/public/images/crypto-environment/05.jpg"),
  require("@/public/images/crypto-environment/06.jpg"),
  require("@/public/images/crypto-environment/07.jpg"),
  require("@/public/images/crypto-environment/08.jpg"),
  require("@/public/images/crypto-environment/09.jpg"),
  require("@/public/images/crypto-environment/10.jpg"),
  require("@/public/images/crypto-environment/11.jpg"),
  require("@/public/images/crypto-environment/12.jpg"),
  require("@/public/images/crypto-environment/13.jpg"),
  require("@/public/images/crypto-environment/14.jpg"),
  require("@/public/images/crypto-environment/15.jpg"),
  require("@/public/images/crypto-environment/16.jpg"),
  require("@/public/images/crypto-environment/17.jpg"),
  require("@/public/images/crypto-environment/18.jpg"),
  require("@/public/images/crypto-environment/19.jpg"),
  require("@/public/images/crypto-environment/20.jpg"),
  require("@/public/images/crypto-environment/21.jpg"),
  require("@/public/images/crypto-environment/22.jpg"),
  require("@/public/images/crypto-environment/23.jpg"),
  require("@/public/images/crypto-environment/24.jpg"),
  require("@/public/images/crypto-environment/25.jpg"),
  require("@/public/images/crypto-environment/26.jpg"),
];
const iconStyles = {
  bgcolor: "action.disabledBackground",
  "&:hover": { bgcolor: "action.disabledBackground" },
};

type PropTypes = {};
export default function CareersView(props: PropTypes) {
  return (
    <div className={styles.root}>
      <AppHeaderComponent title="فرصت های شغلی" backHref="/profile" />
      <Container className={styles.firstSection} component="section">
        <div className={styles.imageWrapper}>
          <Image src={CAREERS} />
        </div>
        <Typography className={styles.title} variant="h4" component="h2">
          فرصت های شغلی در کریپو
        </Typography>
        <Typography>
          فرصت های شغلی مورد نیاز در کریپو را ببینید و برای پیوستن به جمع ما
          رزومه بفرستید.
        </Typography>
      </Container>
      <div className="background-secondary">
        <Container className={styles.benefitSection} component="section">
          <Typography className={styles.title} variant="h4" component="h3">
            مزایای شغلی در کریپو
          </Typography>
          <Grid container className={styles.benefitVisual}>
            <Grid xs={6} sm={4} item className={styles.benefitItem}>
              <CareerGamesIcon className={styles.benefitIcon} />
              <Typography component="span">سالن بازی</Typography>
              <Divider className={styles.left} orientation="vertical" />
              <Divider className={styles.bottom} />
            </Grid>
            <Grid xs={6} sm={4} item className={styles.benefitItem}>
              <CareerFoodIcon className={styles.benefitIcon} />
              <Typography component="span">صبحانه و نهار</Typography>
              <Divider
                className={styles.left}
                orientation="vertical"
                sx={{ display: { xs: "none", sm: "block" } }}
              />
              <Divider className={styles.bottom} />
            </Grid>
            <Grid xs={6} sm={4} item className={styles.benefitItem}>
              <CareerCafeIcon className={styles.benefitIcon} />
              <Typography component="span">کافه</Typography>
              <Divider
                className={styles.left}
                orientation="vertical"
                sx={{ display: { sm: "none" } }}
              />
              <Divider className={styles.bottom} />
            </Grid>
            <Grid xs={6} sm={4} item className={styles.benefitItem}>
              <CareerEducationIcon className={styles.benefitIcon} />
              <Typography component="span">برنامه های آموزشی</Typography>
              <Divider
                className={styles.left}
                orientation="vertical"
                sx={{ display: { xs: "none", sm: "block" } }}
              />
              <Divider
                className={styles.bottom}
                sx={{ display: { sm: "none" } }}
              />
            </Grid>
            <Grid xs={6} sm={4} item className={styles.benefitItem}>
              <CareerGiftsIcon className={styles.benefitIcon} />
              <Typography component="span">هدایای مناسبتی</Typography>
              <Divider className={styles.left} orientation="vertical" />
            </Grid>
            <Grid xs={6} sm={4} item className={styles.benefitItem}>
              <CareerGrowIcon className={styles.benefitIcon} />
              <Typography component="span">رشد و توسعه فردی</Typography>
            </Grid>
          </Grid>
        </Container>
      </div>

      <section className={styles.environmentSection}>
        <Typography className={styles.title} variant="h4" component="h3">
          فضای کاری در کریپو
        </Typography>
        <Swiper
          slidesPerView={1.3}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          spaceBetween={8}
          loop
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          // slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 0,
            modifier: 1,
            scale: 0.91,
            slideShadows: false,
          }}
          breakpoints={{
            600: {
              slidesPerView: 2,
            },
            900: {
              slidesPerView: 3,
            },
            1200: {
              slidesPerView: 4,
            },
          }}
        >
          {images.map((src, idx) => (
            <SwiperSlide key={idx}>
              <div className={styles.imageWrapper}>
                <Image {...{ src }} />
              </div>
            </SwiperSlide>
          ))}
          <div className={styles.navigationButtons}>
            <IconButton sx={iconStyles} className="swiper-button-prev">
              <ArrowForwardIcon />
            </IconButton>
            <IconButton sx={iconStyles} className="swiper-button-next">
              <ArrowBackIcon />
            </IconButton>
          </div>
        </Swiper>
        <a
          href="https://jobinja.ir/companies/crypto/jobs"
          target="_blank"
          rel="noreferrer noopener"
        >
          <ButtonBase className={styles.careersBtn}>
            <Typography component="div">
              فرصت‌های شغلی کریپو را در اینجا مشاهده کنید
            </Typography>
            <Typography className={styles.next} component="div">
              مشاهده <NextIcon />
            </Typography>
          </ButtonBase>
        </a>
      </section>

      {/* <div className="background-secondary">
        <Container
          className={styles.joinUsSection}
          component="section"
          sx={{ bgcolor: "background.secondary" }}
        >
          <Typography className={styles.title} variant="h4" component="h3">
            به ما بپیوندید
          </Typography>
          <Typography className={styles.subtitle}>
            فرصت های شغلی فعلی
          </Typography>
          <TextField
            className={styles.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            placeholder="جستجو در فرصت های شغلی فعلی"
            fullWidth
          />
          <CareerCollapseComponent />
          <CareerCollapseComponent />
          <CareerCollapseComponent />
          <div className={styles.bottom}>
            <Typography
              className={styles.secondaryTitle}
              variant="h6"
              component="h4"
            >
              مهارت شما در لیست نبود؟
            </Typography>
            <Divider
              className={styles.titleDivider}
              sx={{ borderColor: "primary.main" }}
            />
            <Typography>
              اگر فرصت شغلی مورد نظر را نمی‌یابید، رزومه خود را برای بررسی به
              این آدرس ایمیل ارال نمایید.
            </Typography>
            <Link className={styles.email} href="mailto:crypto@gmail.com">
              crypto@gmail.com
            </Link>
          </div>
        </Container>
      </div> */}
    </div>
  );
}
