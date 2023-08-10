import {
  BankCard_2LineIcon,
  BugLineIcon,
  BuildingLineIcon,
  DiscussLineIcon,
  HandCoinLineIcon,
  InformationLineIcon,
  LogoutBoxRLineIcon,
  MoonLineIcon,
  Notification_2LineIcon,
  PercentLineIcon,
  QuestionnaireLineIcon,
  ScalesLineIcon,
  UserLineIcon,
  UserStarLineIcon,
} from "@/core/components/common/remixicons";
import AppBottomNavComponent from "@/core/components/layouts/app-bottom-nav";
import { CheckCircleOutline, KeyboardArrowLeft } from "@mui/icons-material";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import {
  Avatar,
  Button,
  ButtonBase,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  Typography,
} from "@mui/material";
import styles from "./profile-mobile.module.scss";
import Link from "next/link";
import { UserInterface } from "@/modules/auth/domain/entities/user";
import LoginBoxComponent from "@/modules/auth/presentation/components/login-box";
import {
  ArrowBackIcon,
  RoadMapIcon,
} from "@/core/components/common/custom-icon";
import Image from "next/image";
import clsx from "clsx";
import AppHeaderComponent from "@/core/components/layouts/app-header";
import { KycStatus } from "@/core/enums/kyc.enums";
import { AppInitialsInterface } from "@/modules/_app/domain/entities/appInitials";
import BalanceBoxComponent from "@/modules/wallet/presentation/components/balance-box";
import { currencyFormat } from "@/core/helpers";
import { WalletBalanceInterface } from "@/modules/wallet/domain/entities/wallet";
import SupportButtonComponent from "@/modules/_app/presentation/components/support-button";

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

type PropTypes = {
  user?: UserInterface;
  isDarkTheme: boolean;
  toggleTheme: () => void;
  logout: () => void;
  appInitials?: AppInitialsInterface;
  balance?: WalletBalanceInterface;
};
export default function ProfileMobileView(props: PropTypes) {
  const { user, isDarkTheme, toggleTheme, logout, appInitials, balance } =
    props;
  return (
    <>
      <AppHeaderComponent
        title="پروفایل"
        backHref="/"
        // toolbarContent={<SupportButtonComponent sx={{ ml: "auto" }} />}
      />
      <div className={styles.root}>
        <section className={clsx({ [styles.divider]: true, hidden: user })}>
          <LoginBoxComponent />
        </section>
        <section className={clsx({ [styles.divider]: true, hidden: !user })}>
          <Container>
            <div className={styles.userCard}>
              <Avatar className={styles.avatar}>
                {!!user && <Image src={user!.avatar} width={55} height={55} />}
              </Avatar>
              <div className={styles.name}>
                <Typography color="text.secondary">سلام</Typography>
                <Typography fontWeight={500} variant="h6">
                  {user?.fullName}
                </Typography>
              </div>
              <Link href="/kyc" passHref>
                <ButtonBase component="a" className={styles.kycStatus}>
                  {appInitials?.user.kycStatus === KycStatus.Accepted ? (
                    <Typography className={styles.success}>
                      <CheckCircleOutline />
                      <span>تایید شده</span>
                    </Typography>
                  ) : appInitials?.user.kycStatus === KycStatus.NotAccepted ? (
                    <Typography className={styles.error}>
                      <HighlightOffOutlinedIcon />
                      <span>تایید نشده</span>
                    </Typography>
                  ) : appInitials?.user.kycStatus === KycStatus.Rejected ? (
                    <Typography className={styles.error}>
                      <HighlightOffOutlinedIcon />
                      <span>رد شده</span>
                    </Typography>
                  ) : (
                    <Typography className={styles.warning}>
                      <PendingOutlinedIcon />
                      <span>در انتظار تایید</span>
                    </Typography>
                  )}
                </ButtonBase>
              </Link>
            </div>
          </Container>
        </section>
        <section
          className={clsx({
            [styles.divider]: true,
            hidden: !user || !balance,
          })}
        >
          <Container>
            <BalanceBoxComponent className={styles.balanceBox}>
              <div className={styles.top}>
                <Typography component="div" variant="h6" fontWeight={700}>
                  کیف پول ریالی
                </Typography>
                <Link href="/profile/wallet" passHref>
                  <Button
                    component="a"
                    color="inherit"
                    className={styles.button}
                    endIcon={<ArrowBackIcon className={styles.icon} />}
                  >
                    مشاهده جزئیات
                  </Button>
                </Link>
              </div>
              <div>
                <Typography component="div" variant="body2">
                  موجودی
                </Typography>
                <Typography component="div" fontWeight={700} variant="h6">
                  {currencyFormat(balance?.available)}{" "}
                  <Typography component="span" fontWeight={500}>
                    تومان
                  </Typography>
                </Typography>
              </div>
            </BalanceBoxComponent>
          </Container>
        </section>
        <section className={clsx({ [styles.divider]: true, hidden: !user })}>
          <Container>
            <Typography className={styles.title}>حساب</Typography>
            <List className={styles.accountList}>
              <ListItem disablePadding>
                <Link href="/profile/account" passHref>
                  <ListItemButton component="a">
                    <ListItemIcon className={styles.listItemIcon}>
                      <UserLineIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="اطلاعات حساب کاربری"
                      secondary="مشاهده اعلانات حسابتان"
                    />
                    <KeyboardArrowLeft />
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link href="/notifications" passHref>
                  <ListItemButton component="a">
                    <ListItemIcon className={styles.listItemIcon}>
                      <Notification_2LineIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="اعلان‌ها و هشدار‌ها"
                      secondary="تنظیم نحوه اطلاع‌رسانی اعلان‌ها و هشدار‌ها"
                    />
                    <KeyboardArrowLeft />
                  </ListItemButton>
                </Link>
              </ListItem>

              <ListItem disablePadding>
                <Link href="/profile/addresses" passHref>
                  <ListItemButton component="a">
                    <ListItemIcon className={styles.listItemIcon}>
                      <HandCoinLineIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="آدرس‌های ارزی"
                      secondary="مشاهده و ویرایش آدرس‌های ارزی"
                    />
                    <KeyboardArrowLeft />
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link href="/profile/cards" passHref>
                  <ListItemButton component="a">
                    <ListItemIcon className={styles.listItemIcon}>
                      <BankCard_2LineIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="کارت‌ها و شبای بانکی"
                      secondary="مشاهده ویرایش کارت‌ها و شبای بانکی"
                    />
                    <KeyboardArrowLeft />
                  </ListItemButton>
                </Link>
              </ListItem>
            </List>
          </Container>
        </section>
        <section>
          <Container>
            <Typography className={styles.title}>موارد بیش‌تر</Typography>
            <div className={styles.verticalList}>
              <Link href="/users-comments" passHref>
                <ButtonBase component="a">
                  <DiscussLineIcon />
                  <Typography className="span">نظرات کاربران</Typography>
                </ButtonBase>
              </Link>
              <Link href="/contact-manager" passHref>
                <ButtonBase component="a">
                  <UserStarLineIcon />
                  <Typography className="span">تماس با مدیریت</Typography>
                </ButtonBase>
              </Link>
              <Link href="/fee" passHref>
                <ButtonBase component="a">
                  <PercentLineIcon />
                  <Typography className="span">کارمزدها</Typography>
                </ButtonBase>
              </Link>
            </div>
            <List className={styles.list}>
              <ListItem disablePadding>
                <ListItemButton component="label">
                  <ListItemIcon className={styles.listItemIcon}>
                    <MoonLineIcon />
                  </ListItemIcon>
                  <ListItemText primary="حالت تاریک" />
                  <Switch
                    edge="end"
                    onChange={toggleTheme}
                    checked={isDarkTheme}
                    sx={{ my: -1 }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <Link href="/roadmap" passHref>
                  <ListItemButton component="a">
                    <ListItemIcon className={styles.listItemIcon}>
                      <RoadMapIcon />
                    </ListItemIcon>
                    <ListItemText primary="مسیر کریپو" />
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link href="/faq" passHref>
                  <ListItemButton component="a">
                    <ListItemIcon className={styles.listItemIcon}>
                      <QuestionnaireLineIcon />
                    </ListItemIcon>
                    <ListItemText primary="سوالات متداول" />
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link href="/terms-of-service" passHref>
                  <ListItemButton component="a">
                    <ListItemIcon className={styles.listItemIcon}>
                      <ScalesLineIcon />
                    </ListItemIcon>
                    <ListItemText primary="قوانین و مقررات" />
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link href="/bug-report" passHref>
                  <ListItemButton component="a">
                    <ListItemIcon className={styles.listItemIcon}>
                      <BugLineIcon />
                    </ListItemIcon>
                    <ListItemText primary="گزارش باگ" />
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link href="/careers" passHref>
                  <ListItemButton component="a">
                    <ListItemIcon className={styles.listItemIcon}>
                      <BuildingLineIcon />
                    </ListItemIcon>
                    <ListItemText primary="فرصت‌های شغلی" />
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link href="/about-us" passHref>
                  <ListItemButton component="a">
                    <ListItemIcon className={styles.listItemIcon}>
                      <InformationLineIcon />
                    </ListItemIcon>
                    <ListItemText primary="درباره ما" />
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem disablePadding className={user ? "" : "hidden"}>
                <ListItemButton onClick={logout}>
                  <ListItemIcon className={styles.listItemIcon}>
                    <LogoutBoxRLineIcon />
                  </ListItemIcon>
                  <ListItemText primary="خروج از حساب کاربری" />
                </ListItemButton>
              </ListItem>
            </List>
            <div className={styles.contact}>
              {socialItems.map(({ icon, title, ...other }, i) => (
                <IconButton
                  component="a"
                  {...other}
                  key={i}
                  className={styles.btn}
                >
                  <Image src={icon} alt={title} width={24} height={24} />
                </IconButton>
              ))}
            </div>
          </Container>
        </section>
        <AppBottomNavComponent />
      </div>
    </>
  );
}
