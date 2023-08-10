import AppHeaderComponent from "@/core/components/layouts/app-header";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import { ButtonBase, Container, Paper, Typography } from "@mui/material";
import Link from "next/link";
import styles from "./kyc-select-identity.module.scss";

type PropTypes = {};
export default function KycSelectIdentityView(props: PropTypes) {
  return (
    <div className={styles.root}>
      <AppHeaderComponent />
      <Container maxWidth="sm">
        <Paper className={styles.paper}>
          <Typography>یکی از گزینه‌های زیر را انتخاب کنید</Typography>
          <Link href="/kyc/national-card" passHref>
            <ButtonBase component="a" className={styles.selectItem}>
              <Typography component="span">کارت ملی هوشمند دارم</Typography>
              <ArrowBackIos />
            </ButtonBase>
          </Link>
          <Link href="/kyc/national-card?missed=1" passHref>
            <ButtonBase component="a" className={styles.selectItem}>
              <Typography component="span">کارت ملی هوشمند ندارم</Typography>
              <ArrowBackIos />
            </ButtonBase>
          </Link>
        </Paper>
      </Container>
    </div>
  );
}
