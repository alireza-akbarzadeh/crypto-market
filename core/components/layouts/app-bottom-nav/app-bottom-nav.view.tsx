import styles from "./app-bottom-nav.module.scss";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
// import OrdersIcon from "@mui/icons-material/ArticleOutlined";
import {
  FileList_2FillIcon,
  FileList_2LineIcon,
  Home_3FillIcon,
  Home_3LineIcon,
  UserFillIcon,
  UserLineIcon,
  WalletFillIcon,
  WalletLineIcon,
} from "@/core/components/common/remixicons";

type PropTypes = { value?: string; handleChange: (e: any, v: string) => void };
export default function AppBottomNavView(props: PropTypes) {
  const { value, handleChange } = props;
  return (
    <>
      <BottomNavigation className={styles.holder} />
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleChange}
        className={styles.root}
      >
        <BottomNavigationAction
          value="/"
          icon={
            value === "/" ? (
              <Home_3FillIcon className={styles.icon} />
            ) : (
              <Home_3LineIcon className={styles.icon} />
            )
          }
          aria-label="خانه"
          label="خانه"
        />
        <BottomNavigationAction
          label="کیف پول ریالی"
          value="/profile/wallet"
          icon={
            value === "/profile/wallet" ? (
              <WalletFillIcon className={styles.icon} />
            ) : (
              <WalletLineIcon className={styles.icon} />
            )
          }
          aria-label="کیف پول ریالی"
        />
        <BottomNavigationAction
          label="سفارشات"
          value="/orders"
          icon={
            value === "/orders" ? (
              <FileList_2FillIcon className={styles.icon} />
            ) : (
              <FileList_2LineIcon className={styles.icon} />
            )
          }
          aria-label="سفارشات"
        />
        <BottomNavigationAction
          label="پروفایل"
          value="/profile"
          icon={
            value === "/profile" ? (
              <UserFillIcon className={styles.icon} />
            ) : (
              <UserLineIcon className={styles.icon} />
            )
          }
          aria-label="پروفایل"
        />
      </BottomNavigation>
    </>
  );
}
