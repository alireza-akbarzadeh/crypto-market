import styles from "./news.module.scss";
import { NewsletterIcon } from "@/core/components/common/custom-icon";
import { Button, ButtonBase, Container, Typography } from "@mui/material";
import newsCardModelMapper from "@/modules/home/data/model/newsCard";
import ClockIcon from "@mui/icons-material/AccessTime";
import { HomeDataInterface } from "@/modules/home/domain/entities/home";
import { useTokenRoute } from "@/core/hooks";

type PropTypes = { data: HomeDataInterface["news"] };
export default function NewsView(props: PropTypes) {
  const { data } = props;
  const tokenRoute = useTokenRoute();
  return (
    <div className={styles.root}>
      <Container>
        <div className={styles.paper}>
          <div className={styles.header}>
            <NewsletterIcon className={styles.icon} />
            <div>
              <Typography className={styles.title} component="h2">
                نگاهی به اخبار
              </Typography>
              {/* <Typography className={styles.subtitle}>۲۴ ساعت گذشته</Typography> */}
            </div>
            {Boolean(data.action) && (
              <Button
                component="a"
                href={
                  data.action!.hasAuthentication
                    ? tokenRoute(data.action!.route)
                    : data.action!.route
                }
              >
                نمایش همه
              </Button>
            )}
          </div>
          <div className={styles.listWrapper}>
            <div className={styles.list}>
              {data.items.map((news) => (
                <ButtonBase
                  component="a"
                  href={news.link}
                  className={styles.card}
                  key={news.id}
                >
                  <div className={styles.imageWrapper}>
                    <img
                      className={styles.image}
                      src={news.image}
                      alt={news.faTitle}
                    />
                    <Typography
                      className={styles.category}
                      style={{ backgroundColor: news.category.color }}
                      component="span"
                    >
                      {news.category.faTitle}
                    </Typography>
                  </div>
                  <div className={styles.content}>
                    <Typography className={styles.title} component="h4">
                      {news.faTitle}
                    </Typography>
                    <Typography className={styles.date} component="div">
                      <ClockIcon color="primary" />
                      <span>{news.createdAt} توسط</span>
                      <span
                        className={styles.link}
                        // href={news.author.link}
                        title={news.author.name}
                        // rel="noopener noreferrer"
                        // target="_blank"
                      >
                        {news.author.name}
                      </span>
                    </Typography>
                  </div>
                </ButtonBase>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
