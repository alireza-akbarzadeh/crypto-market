import styles from "./home-header.module.scss";
import { Toolbar } from "@mui/material";
import Image from "next/image";
import HEADER_LOGO from "@/public/images/header-logo.svg";
import AppHeaderComponent from "@/core/components/layouts/app-header";
import SupportButtonComponent from "@/modules/_app/presentation/components/support-button";

type PropTypes = {};
export default function HomeHeaderView(props: PropTypes) {
  return (
    <>
      <AppHeaderComponent
        skipHolder
        toolbarContent={
          <div className={styles.toolbar}>
            <div className={styles.logo}>
              <Image src={HEADER_LOGO} />
            </div>
            <SupportButtonComponent />
          </div>
        }
      />
      <Toolbar className="desktop-down" />
    </>
  );
}
