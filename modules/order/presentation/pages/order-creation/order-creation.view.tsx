import { Typography } from "@mui/material";
import styles from "./order-creation.module.scss";

type PropTypes = {};
export default function OrderCreationView(props: PropTypes) {
  return (
    <div className={styles.root}>
      <div className={styles.imageWrapper}>
        <svg
          className={styles.gear}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
        >
          <path
            id="p"
            fill="#FFC107"
            d="M94.1 58.8c.6-2.8.9-5.8.9-8.8s-.3-6-.9-8.8l-11.7-.4c-.7-2.6-1.7-5-3-7.3l8-8.5c-3.3-4.9-7.5-9.2-12.5-12.5l-8.5 8c-2.3-1.3-4.7-2.3-7.3-3l-.3-11.6C56 5.3 53 5 50 5s-6 .3-8.8.9l-.4 11.7c-2.6.7-5 1.7-7.3 3l-8.5-8c-4.9 3.3-9.2 7.5-12.5 12.5l8 8.5c-1.3 2.3-2.3 4.7-3 7.3l-11.6.3C5.3 44 5 47 5 50s.3 6 .9 8.8l11.7.4c.7 2.6 1.7 5 3 7.3l-8 8.5c3.3 4.9 7.5 9.2 12.5 12.5l8.5-8c2.3 1.3 4.7 2.3 7.3 3l.4 11.7c2.7.5 5.7.8 8.7.8s6-.3 8.8-.9l.4-11.7c2.6-.7 5-1.7 7.3-3l8.5 8c4.9-3.3 9.2-7.5 12.5-12.5l-8-8.5c1.3-2.3 2.3-4.7 3-7.3l11.6-.3zM50 66.9c-9.3 0-16.9-7.6-16.9-16.9S40.7 33.1 50 33.1 66.9 40.7 66.9 50 59.3 66.9 50 66.9z"
          />
        </svg>
        <svg
          className={styles.gear}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
        >
          <use href="#p"></use>
        </svg>
      </div>
      <Typography variant="h5" color="primary.main" fontWeight={700}>
        در حال ساخت سفارش شما...
      </Typography>
      <Typography color="text.secondary">
        لطفا از این صفحه خارج نشوید.
      </Typography>
    </div>
  );
}