import { Badge, ButtonBase, Container, Grid, Typography } from "@mui/material";
import styles from "./crypto-services.module.scss";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowBack";
import { HomeDataInterface } from "@/modules/home/domain/entities/home";
import { useTokenRoute } from "@/core/hooks";
import clsx from "clsx";

type PropTypes = {
  data: HomeDataInterface["services"];
  handleStatus: (status: {
    active: boolean;
    description?: string;
  }) => (e: any) => void;
};

export default function CryptoServicesView(props: PropTypes) {
  const { data, handleStatus } = props;
  const tokenRoute = useTokenRoute();
  return (
    <div className={styles.root}>
      <Container>
        <Typography className="section-title desktop-up" component="h2">
          سرویس‌های <span className="primary">کریپو</span>
        </Typography>
        <Typography sx={{ mb: 1 }} component="h2" variant="h6" fontWeight={500}>
          سرویس‌ها
        </Typography>
        <Grid container spacing={{ md: 2.5 }}>
          {data.map(
            ({ name, imageUrl, action, status, badge, description }) => {
              const content = (
                <>
                  <Badge
                    classes={{ badge: styles.badge }}
                    badgeContent={badge?.title}
                    color="error"
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    <img className={styles.image} src={imageUrl} alt="" />
                  </Badge>
                  <div className={styles.info}>
                    <Typography className={styles.title} component="div">
                      {name}
                    </Typography>
                    <Typography className={styles.subtitle} component="div">
                      {description}
                    </Typography>
                  </div>
                  <ArrowForwardIcon className={styles.arrowIcon} />
                </>
              );
              return (
                <Grid
                  className={clsx({
                    ["desktop-down"]:
                      action?.route === "/trade" ||
                      action?.route === "/price-alert",
                    [styles.disabled]: !status.active,
                  })}
                  key={name}
                  item
                  xs={3}
                  md={6}
                  lg={4}
                >
                  {action ? (
                    action.type === "deeplink" && status.active ? (
                      <Link href={action.route} passHref>
                        <ButtonBase
                          onClick={handleStatus(status)}
                          component="a"
                          className={styles.button}
                        >
                          {content}
                        </ButtonBase>
                      </Link>
                    ) : (
                      <ButtonBase
                        onClick={handleStatus(status)}
                        component="a"
                        className={styles.button}
                        href={
                          status.active
                            ? action.hasAuthentication
                              ? tokenRoute(action.route)
                              : action.route
                            : undefined
                        }
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {content}
                      </ButtonBase>
                    )
                  ) : (
                    <div
                      onClick={handleStatus(status)}
                      className={styles.button}
                    >
                      {content}
                    </div>
                  )}
                </Grid>
              );
            }
          )}
        </Grid>
      </Container>
    </div>
  );
}
