import styles from "./unauthenticated-content.module.scss";
import AppHeaderComponent from "@/core/components/layouts/app-header";
import { Button, Container, Typography } from "@mui/material";
import ASSET_PLACEHOLDER from "@/public/images/asset-placeholder.png";
import Image from "next/image";

type PropTypes = {
  openLoginModal: () => void;
  title: string;
  image?: any;
  children?: any;
  backHref?: string;
};
export default function UnauthenticatedContentView(props: PropTypes) {
  const { openLoginModal, title, children, image, backHref } = props;
  return (
    <div className={styles.root}>
      <AppHeaderComponent title={title} backHref={backHref} />
      <Container maxWidth="sm" className={styles.container}>
        <div className={styles.paper}>
          <div className={styles.imageWrapper}>
            <Image src={image || ASSET_PLACEHOLDER} />
          </div>
          <Typography component="h2" variant="h4" className={styles.title}>
            {title}
          </Typography>
          {typeof children === "string" ? (
            <Typography className={styles.description}>{children}</Typography>
          ) : (
            children
          )}

          <Button onClick={openLoginModal} variant="contained" fullWidth>
            ورود به حساب کاربری
          </Button>
        </div>
      </Container>
    </div>
  );
}
