import styles from "./app-side-bar.module.scss";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Drawer,
  IconButton,
  Typography,
  Toolbar,
  Divider,
  ButtonBase,
  Avatar,
} from "@mui/material";
import Link from "next/link";
import { Fragment, useMemo } from "react";
import { currencyFormat } from "@/core/helpers";
import CloseIcon from "@mui/icons-material/Close";
import {
  AboutIcon,
  AdminMailIcon,
  BitgapIcon,
  CommentsIcon,
  FingerprintIcon,
  MenuOrdersIcon,
  MoneyIcon,
  WalletIcon,
  BasketIcon,
  DarkModeIcon,
  LightModeIcon,
  ThemeIcon,
  HomeIcon,
  ExitIcon,
  LivePriceIcon,
  RoadMapIcon,
} from "../../common/custom-icon";
import FaqIcon from "@mui/icons-material/LiveHelpOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import RulesIcon from "@mui/icons-material/FactCheckOutlined";
import CareersIcon from "@mui/icons-material/WorkOutline";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import BugReportIcon from "@mui/icons-material/CampaignRounded";
import AppMenuFooter from "@/core/components/layouts/app-menu-footer";
import { UserInterface } from "@/modules/auth/domain/entities/user";
import LoginBoxComponent from "@/modules/auth/presentation/components/login-box";
import clsx from "clsx";
import Image from "next/image";
import MENU_LOGO from "@/public/images/menu-logo.svg";
import DOWNLOAD_APP from "@/public/images/download-app-.png";
import { AppInitialsInterface } from "@/modules/_app/domain/entities/appInitials";
import { KycStatus } from "@/core/enums/kyc.enums";
import { useTokenRoute } from "@/core/hooks";

type PropTypes = {
  open: boolean;
  onClose: () => void;
  isDarkTheme: boolean;
  toggleTheme: () => void;
  logout: () => void;
  user?: UserInterface;
  pathname: string;
  openLoginModal: () => void;
  appInitials?: AppInitialsInterface;
  isStandalone: boolean;
};
export default function AppSideBarView(props: PropTypes) {
  const {
    open,
    onClose,
    isDarkTheme,
    toggleTheme,
    user,
    logout,
    pathname,
    openLoginModal,
    appInitials,
    isStandalone,
  } = props;

  const bitgapHref = useTokenRoute()("/bitgap");
  const menuItems: any[] = useMemo(() => {
    const {
      home,
      // news,
      assets,
      livePrice,
      orders,
      wallet,
      authentication,

      fee,
      howToCreateWallet,
      bugReport,
      careers,

      contactManager,
      usersComments,
      bitgap,
      roadMap,
      rules,
      aboutUs,
      faq,

      divider,

      theme,
    } = {
      home: {
        primary: "خانه",
        icon: HomeIcon,
        href: "/",
      },
      // news: {
      //   primary: "خبر فوری",
      //   secondary: () => (
      //     <Typography>
      //       <span className="online-dot warning" />
      //       {/* {currencyFormat(appInitials?.bitgapUserOnline)} */}
      //       {/* نفر */}
      //     </Typography>
      //   ),
      //   icon: NewspaperIcon,
      //   href: '/news',
      //   outerLink: true,
      // },
      assets: {
        primary: "پورتفوی",
        icon: BasketIcon,
        href: "/portfolio",
      },
      livePrice: {
        primary: "قیمت لحظه ای",
        secondary: () => (
          <Typography>
            {currencyFormat(appInitials?.currencyCount)} ارز دیجیتال
          </Typography>
        ),
        icon: LivePriceIcon,
        href: "/live-price",
      },
      wallet: {
        primary: "کیف پول ریالی",
        secondary: () =>
          user ? (
            appInitials?.user.availableBalance ? (
              <Typography color="success.main">
                {currencyFormat(appInitials?.user.availableBalance, "تومان")}
              </Typography>
            ) : null
          ) : (
            <Typography color="secondary">باید وارد شوید</Typography>
          ),
        icon: WalletIcon,
        ...(user ? { href: "/profile/wallet" } : { onClick: openLoginModal }),
      },
      authentication: {
        primary: "احراز هویت",
        secondary: () => {
          switch (appInitials?.user.kycStatus) {
            case KycStatus.Accepted:
              return <Typography color="success.main">تایید شده</Typography>;
            case KycStatus.NotAccepted:
              return <Typography color="error.main">تایید نشده</Typography>;
            case KycStatus.Rejected:
              return <Typography color="error.main">رد شده</Typography>;
            default:
              return (
                <Typography color="warning.main">در انتظار تایید</Typography>
              );
          }
        },
        icon: FingerprintIcon,
        href: "/kyc",
      },

      orders: {
        primary: "سفارشات",
        href: "/orders",
        icon: MenuOrdersIcon,
      },
      bitgap: {
        primary: "بیت گپ",
        secondary: () => (
          <Typography>
            <span className="online-dot" />
            {/* {currencyFormat(appInitials?.bitgapUserOnline)} */}
            {/* نفر */}
            آنلاین
          </Typography>
        ),
        icon: BitgapIcon,
        href: bitgapHref,
        outerLink: true,
      },
      fee: {
        primary: "کارمزدها",
        icon: MoneyIcon,
        href: "/fee",
      },
      bugReport: {
        primary: "گزارش باگ",
        icon: BugReportIcon,
        href: "/bug-report",
      },
      howToCreateWallet: {
        primary: "آموزش ساخت کیف پول",
        icon: SchoolOutlinedIcon,
        href: "/how-to-create-wallet",
      },
      contactManager: {
        primary: "ارتباط با مدیریت",
        icon: AdminMailIcon,
        href: "/contact-manager",
      },
      careers: {
        primary: "فرصت های شغلی",
        icon: CareersIcon,
        href: "/careers",
        // href: "https://jobinja.ir/companies/crypto/jobs",
        // target: "_blank",
        // rel: "noreferrer noopener",
      },
      usersComments: {
        primary: "نظرات کاربران",
        icon: CommentsIcon,
        href: "/users-comments",
      },
      theme: {
        primary: isDarkTheme ? "تغییر به حالت روشن" : "تغییر به حالت تیره",
        icon: ThemeIcon,
        secondary: () => (
          <ListItemIcon sx={{ minWidth: 0 }}>
            {isDarkTheme ? <DarkModeIcon /> : <LightModeIcon />}
          </ListItemIcon>
        ),
        onClick: toggleTheme,
      },
      aboutUs: {
        primary: "درباره ما",
        icon: AboutIcon,
        href: "/about-us",
      },
      roadMap: {
        primary: "مسیر کریپو",
        icon: RoadMapIcon,
        href: "/roadmap",
      },
      faq: {
        primary: "سوالات متداول",
        icon: FaqIcon,
        href: "/faq",
      },
      rules: {
        primary: "قوانین و مقررات",
        icon: RulesIcon,
        href: "/terms-of-service",
      },
      divider: { divider: true },
    };
    if (user) {
      return [
        home,
        // news,
        assets,
        livePrice,
        orders,
        wallet,
        authentication,
        theme,
        divider,

        fee,
        howToCreateWallet,
        bugReport,
        careers,
        divider,

        contactManager,
        usersComments,
        bitgap,
        roadMap,
        faq,
        rules,
        aboutUs,
      ];
    }
    return [
      home,
      // news,
      assets,
      livePrice,
      wallet,
      theme,
      divider,

      fee,
      howToCreateWallet,
      bugReport,
      careers,
      divider,

      contactManager,
      usersComments,
      bitgap,
      roadMap,
      faq,
      rules,
      aboutUs,
    ];
  }, [isDarkTheme, toggleTheme, user, appInitials, bitgapHref]);

  return (
    <Drawer
      onClose={onClose}
      open={open}
      PaperProps={{
        className: styles.paper,
        sx: { bgcolor: "background.secondary" },
      }}
    >
      <div className={styles.sidebar}>
        <Toolbar>
          <IconButton
            onClick={onClose}
            edge="end"
            size="large"
            sx={{ ml: "auto" }}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>

        <div className={clsx(styles.logoContainer, "mobile-up")}>
          <Image src={MENU_LOGO} />
        </div>
        {Boolean(user) && (
          <Link href="/profile/account">
            <div
              onClick={onClose}
              className={clsx(styles.miniProfile, "mobile-down")}
            >
              <Avatar className={styles.avatar}>
                <Image src={user!.avatar} width={55} height={55} />
              </Avatar>
              <div>
                <Typography fontWeight={500} variant="h6">
                  {user!.fullName}
                </Typography>
                <Typography>خوش آمدید</Typography>
              </div>
            </div>
          </Link>
        )}
        <Box className="mobile-down" sx={{ px: 1.5 }}>
          {Boolean(!user) && <LoginBoxComponent />}
        </Box>
        {!isStandalone && (
          <Box sx={{ px: 1.5, pb: 4 }}>
            <Link href="/download-app">
              <ButtonBase component="a" className={styles.downloadApp}>
                <Image src={DOWNLOAD_APP} />
              </ButtonBase>
            </Link>
          </Box>
        )}
        <List className={styles.sidebarList} dense>
          {menuItems.map(
            (
              {
                icon: Icon,
                primary,
                secondary,
                href,
                onClick,
                divider,
                outerLink,
                ...other
              },
              idx
            ) => {
              if (divider)
                return <Divider key={idx} className={styles.divider} />;

              const listItem = (link?: boolean) => (
                <ListItem
                  component={link || outerLink ? "a" : "li"}
                  href={outerLink ? href : undefined}
                  className={clsx({
                    [styles.listItem]: true,
                    [styles.selected]: href === pathname,
                  })}
                  disablePadding
                  {...other}
                >
                  <ListItemButton
                    onClick={onClick || onClose}
                    className={styles.listItemButton}
                  >
                    <ListItemIcon className={styles.listItemIcon}>
                      <Icon />
                    </ListItemIcon>
                    <Typography sx={{ flexGrow: 1 }}>{primary}</Typography>
                    {secondary ? secondary() : null}
                  </ListItemButton>
                </ListItem>
              );
              return (
                <Fragment key={primary}>
                  {href && !outerLink ? (
                    <Link href={href} passHref>
                      {listItem(true)}
                    </Link>
                  ) : (
                    listItem()
                  )}
                </Fragment>
              );
            }
          )}

          {Boolean(user) && (
            <>
              <ListItem className={styles.listItem} disablePadding>
                <ListItemButton
                  onClick={logout}
                  className={styles.listItemButton}
                >
                  <ListItemIcon className={styles.listItemIcon}>
                    <ExitIcon color="error" />
                  </ListItemIcon>
                  <Typography color="error.main" sx={{ flexGrow: 1 }}>
                    خروج از حساب کاربری
                  </Typography>
                </ListItemButton>
              </ListItem>
            </>
          )}
        </List>

        <AppMenuFooter className="mobile-down" />
      </div>
    </Drawer>
  );
}
