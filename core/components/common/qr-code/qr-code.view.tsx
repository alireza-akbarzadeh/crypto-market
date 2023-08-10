import styles from "./qr-code.module.scss";
import { useTheme } from "@mui/material/styles";
import QRCode from "qrcode.react";
import LOGO from "@/public/images/main-logo.svg";
import Image from "next/image";

type PropTypes = { value: string; size?: number };
export default function QrCodeView(props: PropTypes) {
  const { value, size = 150 } = props;
  const theme = useTheme();
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <QRCode
          renderAs="svg"
          size={size}
          fgColor={theme.palette.text.primary}
          bgColor="transparent"
          value={value}
          level="H"
        />
        <div className={styles.imageWrapper}>
          <Image src={LOGO} width={size / 5} height={size / 5} />
        </div>
      </div>
    </div>
  );
}
