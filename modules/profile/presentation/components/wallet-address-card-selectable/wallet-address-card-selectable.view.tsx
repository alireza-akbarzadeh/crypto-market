import styles from "./wallet-address-card-selectable.module.scss";
import { ButtonBase, IconButton, Paper, Typography } from "@mui/material";
import Image from "next/image";
import { CopyIcon, TrashIcon } from "@/core/components/common/custom-icon";
import { parseString } from "@/core/helpers";
import CheckIcon from "@mui/icons-material/Check";
import { WalletAddressInterface } from "@/modules/profile/domain/entities/wallet-address";
import clsx from "clsx";

type PropTypes = {
  data: WalletAddressInterface;
  selected?: boolean;
  onSelect?: () => void;
};
export default function WalletAddressCardSelectableView(props: PropTypes) {
  const {
    data: { id, image, network, address, tag, label, color },
    selected,
    onSelect,
  } = props;
  return (
    <Paper
      className={clsx({
        [styles.card]: true,
        [styles.selected]: selected,
      })}
      variant="outlined"
    >
      <ButtonBase
        onClick={onSelect}
        component="div"
        className={styles.actionArea}
        disableRipple={!onSelect}
      >
        <div className={styles.side}>
          <Image src={image} alt={network} width={46} height={46} />

          <Typography
            component="div"
            className={styles.tag}
            // style={{ backgroundColor: color }}
          >
            {network}
          </Typography>
        </div>
        <div className={styles.content}>
          <Typography>
            <span className={styles.label}>آدرس: </span>
            <Typography component="span" className="en">
              {parseString(address, 6, 15, "****")}
            </Typography>
          </Typography>
          <Typography>
            <span className={styles.label}>تگ یا ممو: </span>
            {tag || "ندارد"}
          </Typography>
          <div className={styles.foot}>
            <Typography>
              <span className={styles.label}>عنوان: </span>
              <Typography component="span">{label || "ندارد"}</Typography>
            </Typography>
          </div>
        </div>
      </ButtonBase>
    </Paper>
  );
}
