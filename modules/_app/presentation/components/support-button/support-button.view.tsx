import { CustomerServiceLineIcon } from "@/core/components/common/remixicons";
import { ButtonBase, Typography } from "@mui/material";
import styles from "./support-button.module.scss";

type PropTypes = { openSupport: () => void };
export default function SupportButtonView(props: PropTypes) {
  const { openSupport, ...other } = props;
  return (
    <ButtonBase className={styles.supportBtn} onClick={openSupport} {...other}>
      <CustomerServiceLineIcon />
      <Typography component="span">آیا نیاز به کمک دارید؟</Typography>
    </ButtonBase>
  );
}
