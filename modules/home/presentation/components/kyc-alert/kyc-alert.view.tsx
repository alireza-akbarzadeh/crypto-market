import styles from "./kyc-alert.module.scss";
import { Typography, ButtonBase } from "@mui/material";
import { AppInitialsInterface } from "@/modules/_app/domain/entities/appInitials";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import SecurityIcon from "@mui/icons-material/Security";

type PropTypes = {
  kycShortcut?: AppInitialsInterface["kycShortcut"];
};
export default function KycAlertView(props: PropTypes) {
  const { kycShortcut } = props;

  if (!kycShortcut?.enable) return null;
  return (
    <Link href="/kyc">
      <ButtonBase component="div" className={styles.alertContainer}>
        <div className={styles.icon}>
          <SecurityIcon />
        </div>
        <div className={styles.content}>
          <Typography component="div" fontWeight={700}>
            {kycShortcut.description}
          </Typography>
          <ArrowBackIcon className="desktop-up" />
        </div>
      </ButtonBase>
    </Link>
  );
}
