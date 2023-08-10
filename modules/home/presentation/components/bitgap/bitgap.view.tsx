import styles from "./bitgap.module.scss";
import { Bitgap_2Icon } from "@/core/components/common/custom-icon";
import {
  Button,
  ButtonBase,
  Container,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { ellipsis, numberAbbreviation } from "@/core/helpers";
import { useTokenRoute } from "@/core/hooks";
import { HomeDataInterface } from "@/modules/home/domain/entities/home";
import { BitgapTopicCard } from "@/modules/home/domain/entities/bitgap";
import ClockIcon from "@mui/icons-material/AccessTime";

type PropTypes = {
  data: HomeDataInterface["gaps"];
  handleSortChange: (val: number) => void;
  sort: number;
};
export default function BitgapView(props: PropTypes) {
  const { data, handleSortChange, sort } = props;
  const tokenRoute = useTokenRoute();

  return (
    <div className={styles.root}>
      <Container>
        <div className={styles.paper}>
          <div className={styles.header}>
            <Bitgap_2Icon className={styles.icon} />
            <div>
              <Typography className={styles.title} component="h2">
                بیت گپ
              </Typography>
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
          <div className={styles.filterSection}>
            <ToggleButtonGroup
              color="standard"
              fullWidth
              value={sort}
              exclusive
              onChange={(_, val) => handleSortChange(val ?? sort)}
              size="small"
              className={styles.sort}
            >
              {data.collections.map((c, i) => (
                <ToggleButton key={c.titleEn} value={i}>
                  {c.titleFa}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </div>
          <div className={styles.listWrapper}>
            <div className={styles.list}>
              {data.collections[sort].items.map((item) => (
                <ButtonBase
                  component="a"
                  href={tokenRoute(item.urlAddress)}
                  // href={tokenRoute(`bitgap/details/${item.id}/${item.title}`)}
                  className={styles.card}
                  key={item.id}
                >
                  <div className={styles.cardHeader}>
                    <img src={item.category.image} alt={item.category.title} />
                    <Typography className={styles.category} component="div">
                      {item.category.title}
                    </Typography>
                  </div>
                  <Typography className={styles.title} component="h4">
                    {item.title}
                  </Typography>
                  <Typography className={styles.summery}>
                    {ellipsis(item.summery)}
                  </Typography>
                  <Typography
                    className={styles.date}
                    variant="caption"
                    color="text.secondary"
                  >
                    <span>{item.createdAt}</span>
                    <ClockIcon className={styles.icon} />
                  </Typography>
                  <div className={styles.cardFooter}>
                    <div>
                      <VisibilityOutlinedIcon />
                      <Typography component="span">
                        {numberAbbreviation(item.totalView)}
                      </Typography>
                    </div>
                    <div>
                      <FavoriteBorderOutlinedIcon />
                      <Typography component="span">
                        {numberAbbreviation(item.totalLikes)}
                      </Typography>
                    </div>
                    <div>
                      <ChatBubbleOutlineOutlinedIcon />
                      <Typography component="span">
                        {numberAbbreviation(item.totalComment)}
                      </Typography>
                    </div>
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
