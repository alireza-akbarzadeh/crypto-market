import styles from "./app-menu-footer.module.scss";
import { IconButton, Typography, Box, BoxProps } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

const socialItems = [
  {
    title: "phone",
    icon: require("@/public/icons/phone.svg"),
    href: "tel:02191079677",
  },
  {
    title: "mail",
    icon: require("@/public/icons/gmail.svg"),
    href: "mailto: crypto.net@gmail.com",
  },
  {
    title: "telegram",
    icon: require("@/public/icons/telegram.svg"),
    href: "https://t.me/crypto24",
    target: "_blank",
    rel: "noreferrer noopener",
  },
  {
    title: "instagram",
    icon: require("@/public/icons/instagram.svg"),
    href: "https://www.instagram.com/crypto24/",
    target: "_blank",
    rel: "noreferrer noopener",
  },
  {
    title: "twitter",
    icon: require("@/public/icons/twitter.svg"),
    href: "https://twitter.com/crypto/",
    target: "_blank",
    rel: "noreferrer noopener",
  },
];
type PropTypes = {} & BoxProps;
export default function AppMenuFooterView(props: PropTypes) {
  return (
    <Box {...props} className={clsx(styles.footer, props.className)}>
      <Box color="text.secondary" className={styles.linkList}>
        <Link href="/terms-of-service">
          <Typography component="a">قوانین</Typography>
        </Link>
        <span className={styles.bullet} />
        <Link href="/faq">
          <Typography component="a">سوالات متداول</Typography>
        </Link>
        <span className={styles.bullet} />
        <Link href="/roadmap">
          <Typography component="a">مسیر کریپو</Typography>
        </Link>
      </Box>
      <div className={styles.contact}>
        {socialItems.map(({ icon, title, ...other }, i) => (
          <IconButton
            component="a"
            {...other}
            key={i}
            sx={{
              m: 0.25,
              bgcolor: "background.paper",
              boxShadow: 1,
              "&:hover": { bgcolor: "background.paper" },
            }}
          >
            <Image src={icon} alt={title} width={24} height={24} />
          </IconButton>
        ))}
      </div>
    </Box>
  );
}
