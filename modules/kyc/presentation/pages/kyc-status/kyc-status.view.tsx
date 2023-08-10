import AppHeaderComponent from "@/core/components/layouts/app-header";

import { NextPage } from "@/core/enums/next-page.enums";
import { KycStatusInterface } from "@/modules/kyc/domain/entities/kyc";
import { Button, Container, Paper, Skeleton, Typography } from "@mui/material";
import clsx from "clsx";
import Image from "next/image";
import { useMemo } from "react";
import styles from "./kyc-status.module.scss";

type PropTypes = {
  data?: KycStatusInterface;
  handleAction: () => void;
};
export default function KycStatusView(props: PropTypes) {
  const { data, handleAction } = props;
  const nextTitle = useMemo(() => {
    switch (data?.nextPage) {
      case NextPage.Home:
        return "خانه";
      case NextPage.Deal:
        return "خرید و فروش";
      default:
        return "ادامه";
    }
  }, [data?.nextPage]);

  return (
    <div className={styles.root}>
      <AppHeaderComponent title="احراز هویت" backHref="/" />
      <Container maxWidth="sm">
        <Paper className={styles.paper}>
          <div className={styles.imageContainer}>
            <div className={styles.imageWrapper}>
              {data ? (
                <Image src={data.icon} layout="fill" />
              ) : (
                <Skeleton
                  variant="rectangular"
                  className={styles.imageSkeleton}
                />
              )}
            </div>
          </div>

          <Typography
            className={clsx(styles.title, styles["status-" + data?.status])}
            component="h2"
          >
            {data ? (
              data.title
            ) : (
              <Skeleton width={140} className="center-skeleton" />
            )}
          </Typography>
          <Typography className={styles.description}>
            {data ? (
              data.description
            ) : (
              <>
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton width={140} />
              </>
            )}
          </Typography>
          {data?.rules ? (
            <div className={styles.rules}>
              <Typography className={styles.ruleTitle}>
                {data.rules.ruleTitle}
              </Typography>
              <ul>
                {data.rules.ruleItems.map((rule) => (
                  <Typography key={rule} component="li">
                    {rule}
                  </Typography>
                ))}
              </ul>
            </div>
          ) : null}
          <Button
            className={styles.button}
            variant="contained"
            onClick={handleAction}
          >
            {nextTitle}
          </Button>
        </Paper>
      </Container>
    </div>
  );
}
