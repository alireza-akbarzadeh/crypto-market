import styles from "./app-header.module.scss";
import {
  AppBar,
  Toolbar,
  IconButton,
  AppBarProps,
  Container,
  Button,
  Divider,
  Skeleton,
  Typography,
} from "@mui/material";
import AppSideBar from "@/core/components/layouts/app-side-bar";
import {
  MenuDesktopIcon,
  MenuIcon,
  UserOutlineIcon,
  AnnouncementIcon,
} from "@/core/components/common/custom-icon";
import HEADER_LOGO from "@/public/images/header-logo.svg";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { UserInterface } from "@/modules/auth/domain/entities/user";
import { AppInitialsInterface } from "@/modules/_app/domain/entities/appInitials";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowBackIos";
import { ArrowForwardIos } from "@mui/icons-material";
import SupportButtonComponent from "@/modules/_app/presentation/components/support-button";

type PropTypes = {
  children?: any;
  toolbarContent?: any;
  bgcolor?: string;
  elevation?: number;
  sidebarOpen: boolean;
  userLoading: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  user?: UserInterface;
  openLoginModal: () => void;
  endLogo?: boolean;
  appInitials?: AppInitialsInterface;
  closeAnnouncement: () => void;
  handleBack: (e: any) => void;
  announcementClosed: boolean;
  skipHolder?: boolean;
  backHref?: string;
  title?: string;
} & AppBarProps;
export default function AppHeaderView(props: PropTypes) {
  const {
    children,
    toolbarContent,
    bgcolor,
    elevation,
    sidebarOpen,
    openSidebar,
    closeSidebar,
    user,
    openLoginModal,
    className,
    userLoading,
    appInitials,
    closeAnnouncement,
    announcementClosed,
    skipHolder,
    backHref,
    handleBack,
    title,
    ...others
  } = props;
  const renderAnnouncement = () => {
    if (!appInitials?.announcement.enable || announcementClosed) {
      return null;
    }

    const { link, title } = appInitials.announcement;
    return (
      <div className={styles.announcement}>
        <Container className={styles.container}>
          <AnnouncementIcon sx={{ fontSize: "1.5em" }} />
          <Typography
            className={styles.link}
            component='a'
            href={link}
            rel='noopener noreferrer'
            target='_blank'
          >
            <span>{title}</span>
            <ArrowForwardIcon
              className='forward-animation'
              sx={{ fontSize: ".8em" }}
            />
          </Typography>
          <IconButton onClick={closeAnnouncement} className={styles.close}>
            <CloseIcon />
          </IconButton>
        </Container>
      </div>
    );
  };
  return (
    <>
      <div className={styles.announcementHolder}>{renderAnnouncement()}</div>
      {!skipHolder && <Toolbar />}
      <AppBar
        className={clsx(styles.appBar, className)}
        position='fixed'
        sx={{ bgcolor: bgcolor || "background.default" }}
        elevation={elevation || 0}
        {...others}
      >
        {renderAnnouncement()}
        <Container>
          <Toolbar className='desktop-down' disableGutters>
            {!!backHref && (
              <Link href={backHref} passHref>
                <IconButton
                  onClick={handleBack}
                  component='a'
                  size='large'
                  edge='start'
                  color='inherit'
                  sx={{ mr: 0.5 }}
                >
                  <ArrowForwardIos />
                </IconButton>
              </Link>
            )}
            {!!title && (
              <Typography component='h1' className={styles.headerTitle}>
                {title}
              </Typography>
            )}
            {toolbarContent || <SupportButtonComponent sx={{ ml: "auto" }} />}
          </Toolbar>
          <Toolbar
            className={clsx(styles.desktopToolbar, "desktop-up")}
            disableGutters
          >
            <Button
              onClick={openSidebar}
              color='inherit'
              aria-label='menu'
              startIcon={<MenuDesktopIcon />}
            >
              منو
            </Button>
            <div className={styles.navbar}>
              <Link href='/'>
                <Button color='inherit'>خانه</Button>
              </Link>
              <Link href='/live-price'>
                <Button color='inherit'>قیمت لحظه‌ای</Button>
              </Link>
              {Boolean(user) && (
                <Link href='/orders'>
                  <Button color='inherit'>سفارشات</Button>
                </Link>
              )}
              <Link href='/fee'>
                <Button color='inherit'>کارمزدها</Button>
              </Link>
              <Link href='/portfolio'>
                <Button color='inherit'>پورتفوی</Button>
              </Link>
            </div>
            <div className={styles.endSection}>
              {/* {typeof window === "undefined" || userLoading ? ( */}
              {userLoading ? (
                <Skeleton variant='rectangular' width={110} height={38} />
              ) : user ? (
                <Link href='/profile/account'>
                  <Button
                    // component={Link}

                    variant='containedLight'
                    startIcon={<UserOutlineIcon />}
                  >
                    {user.fullName}
                  </Button>
                </Link>
              ) : (
                <Button onClick={openLoginModal} variant='contained'>
                  ورود / ثبت نام
                </Button>
              )}

              <Divider orientation='vertical' className={styles.divider} />

              <Link href='/'>
                <a className={styles.logoContainer}>
                  <Image src={HEADER_LOGO} />
                </a>
              </Link>
            </div>
          </Toolbar>
        </Container>
        <AppSideBar open={sidebarOpen} onClose={closeSidebar} />
        {children}
      </AppBar>
    </>
  );
}
