import AppHeaderComponent from "@/core/components/layouts/app-header";
import { Button } from "@mui/material";
import styles from "./not-found.module.scss";
import Image from "next/image";
import Link from "next/link";
import NOT_FOUND from "@/public/images/404.svg";

type PropTypes = {};
export default function NotFoundView(props: PropTypes) {
  return (
    <div className={styles.root}>
      <AppHeaderComponent />
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <Image src={NOT_FOUND} width={438} height={438} />
        </div>
        <Link href="/" replace>
          <Button variant="outlined">بازگشت به صفحه اصلی</Button>
        </Link>
      </div>
    </div>
  );
}
