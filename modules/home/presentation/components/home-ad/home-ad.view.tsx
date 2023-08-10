// import { HomeDataInterface } from "@/modules/home/domain/entities/home";
import { ButtonBase, Container } from "@mui/material";
import styles from "./home-ad.module.scss";
import DOWNLOAD from "@/public/images/download.png";
import Image from "next/image";
import Link from "next/link";

type PropTypes = {
  // data: HomeDataInterface["ad"]
};
export default function HomeAdView(props: PropTypes) {
  return (
    <div className={styles.root}>
      <Container>
        <Link href="/download-app" passHref>
          <ButtonBase className={styles.button} component="a">
            <Image src={DOWNLOAD} width={600} height={132} />
          </ButtonBase>
        </Link>
      </Container>
    </div>
  );
}
