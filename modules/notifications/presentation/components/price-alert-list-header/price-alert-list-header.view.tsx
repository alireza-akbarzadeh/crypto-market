import { PriceAlertGroup } from "@/modules/notifications/domain/entities/priceAlerts";
import { Button, Typography } from "@mui/material";
import Image from "next/image";
import styles from "./price-alert-list-header.module.scss";

type PropTypes = {
  data: Omit<PriceAlertGroup, "alerts" | "hasMore">;
  onAdd: () => void;
};
export default function PriceAlertListHeaderView(props: PropTypes) {
  const { data, onAdd } = props;
  if (!data) return null;
  return (
    <div className={styles.root}>
      <div className={styles.box}>
        <Image src={data.icon} width={32} height={32} />
        <Typography component="span" className={styles.text}>
          {data.faName}
        </Typography>
        <Typography component="span" className={styles.symbol}>
          {data.shortName}
        </Typography>
      </div>

      <Button onClick={onAdd} className={styles.add}>
        افزودن
      </Button>
    </div>
  );
}
