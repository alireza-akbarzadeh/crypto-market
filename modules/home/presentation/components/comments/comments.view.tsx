import CommentCardComponent from "@/modules/app-properties/presentation/components/comment-card";
import { HomeDataInterface } from "@/modules/home/domain/entities/home";
import { ChatBubbleOutline } from "@mui/icons-material";
import { Button, Container, Typography } from "@mui/material";
import clsx from "clsx";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./comments.module.scss";

type PropTypes = { data: HomeDataInterface["comments"] };
export default function CommentsView(props: PropTypes) {
  const { data } = props;
  return (
    <div className={styles.root}>
      <Container>
        <div className={clsx(styles.header, "desktop-down")}>
          <ChatBubbleOutline className={styles.icon} />
          <div>
            <Typography className={styles.title} component="h2">
              نظرات کاربران
            </Typography>
          </div>
          <Link href="/users-comments" passHref>
            <Button component="a">نمایش همه</Button>
          </Link>
        </div>
        <div className="desktop-up">
          <Typography className="section-title" component="h2">
            نظرات کاربران
          </Typography>
          <Typography className={styles.description}>
            ما تنها صرافی با بیش از ۳۰۰ ارز و قیمت مناسب در ایران هستیم که در
            کنار ظاهری سریع و آسان، پشتیبانی ۲۴ ساعته ارائه میده تا خیالتون از
            هر بابت راحت باشه
          </Typography>
        </div>
        <Swiper
          className={styles.swiper}
          spaceBetween={8}
          // loop
          slidesPerView={1.2}
          breakpoints={{
            600: { slidesPerView: 2 },
            900: { slidesPerView: 3 },
          }}
        >
          {data.map((comment, idx) => (
            <SwiperSlide key={idx}>
              <CommentCardComponent data={comment} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </div>
  );
}
