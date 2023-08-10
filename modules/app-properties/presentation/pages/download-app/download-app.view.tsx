import styles from "./download-app.module.scss";

import DownloadAppComponent from "../../components/download-app";
import { Container, Typography } from "@mui/material";
import clsx from "clsx";
import AppHeaderComponent from "@/core/components/layouts/app-header";

type PropTypes = {};
export default function DownloadAppView(props: PropTypes) {
  return (
    <div className={styles.root}>
      <AppHeaderComponent title="اپلیکیشن کریپو" backHref="/" />
      <Container className={styles.container}>
        <div className={styles.paper}>
          <Typography
            className={clsx(styles.mainTitle, "desktop-up")}
            component="h2"
            variant="h5"
            fontWeight={600}
          >
            اپلیکیشن کریپو
          </Typography>
          <DownloadAppComponent />
        </div>
      </Container>
    </div>
  );
}
