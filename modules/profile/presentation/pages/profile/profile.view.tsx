import styles from "./profile.module.scss";
import {
  Container,
  Toolbar,
  Typography,
  List,
  Grid,
  Button,
  ListItemIcon,
  Divider,
  ListItemButton,
  ListItem,
} from "@mui/material";
import AppHeader from "@/core/components/layouts/app-header";
import {
  ExitIcon,
  UserOutline_2Icon,
} from "@/core/components/common/custom-icon";
import { UserInterface } from "@/modules/auth/domain/entities/user";
import AccountComponent from "../../components/account";
import BankCardComponent from "../../components/bank-card";
import IbanComponent from "../../components/iban";
import WalletAddressComponent from "../../components/wallet-address";
import WalletPage from "@/modules/wallet/presentation/pages/wallet";
import { useMemo } from "react";
import UserAvatarComponent from "../../components/user-avatar";
import IbanIcon from "@mui/icons-material/LibraryBooksOutlined";
import BankCardIcon from "@mui/icons-material/CreditCardOutlined";
import AddressesIcon from "@mui/icons-material/FormatListNumberedRtlOutlined";
import WalletIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import LoadingComponent from "@/core/components/common/loading";
import PasswordIcon from "@mui/icons-material/VpnKeyOutlined";
import TabsComponent from "@/core/components/common/tabs";
import clsx from "clsx";
import AppBottomNavComponent from "@/core/components/layouts/app-bottom-nav";
import UnauthenticatedContentComponent from "@/core/components/layouts/unauthenticated-content";
import SupportButtonComponent from "@/modules/_app/presentation/components/support-button";

export enum ProfileTabs {
  Account = "account",
  BankCard = "cards",
  CurrencyWallet = "wallet",
  WalletAddresses = "addresses",
  Iban = "ibans",
}
type PropTypes = {
  user?: UserInterface;
  isDarkTheme: boolean;
  toggleTheme: () => void;
  state: ProfileTabs;
  setState: (state: ProfileTabs) => void;
  isDesktopSize: boolean;
  logout: () => void;
  changeAvatar: () => void;
  openPasswordChange: () => void;
  userLoading: boolean;
};
export default function ProfileView(props: PropTypes) {
  const {
    user,
    state,
    setState,
    logout,
    changeAvatar,
    userLoading,
    openPasswordChange,
  } = props;

  const tabTitle = useMemo(() => {
    switch (state) {
      case ProfileTabs.Account:
        return "مشخصات حساب کاربری";
      case ProfileTabs.BankCard:
        return "کارت‌های بانکی";
      case ProfileTabs.Iban:
        return "شباهای بانکی";
      case ProfileTabs.WalletAddresses:
        return "آدرس‌های ارزی";
      case ProfileTabs.CurrencyWallet:
        return "کیف پول ریالی";
    }
  }, [state]);
  const headerTitle = useMemo(() => {
    switch (state) {
      case ProfileTabs.Account:
        return "اطلاعات حساب کاربری";
      case ProfileTabs.BankCard:
      case ProfileTabs.Iban:
        return "کارت‌ها و شبای بانکی";
      case ProfileTabs.WalletAddresses:
        return "آدرس‌های ارزی";
      case ProfileTabs.CurrencyWallet:
        return "کیف پول ریالی";
    }
  }, [state]);
  const emptyDescription = useMemo(() => {
    switch (state) {
      case ProfileTabs.CurrencyWallet:
        return "در این بخش می‌توانید، از قابلیت‌های این سرویس از جمله واریز و برداشت آنی، افزایش سقف خرید و ... مطلع شوید.";
      default:
        return "";
    }
  }, [state]);
  const tabContent = useMemo(() => {
    if (!user) return null;
    switch (state) {
      case ProfileTabs.Account:
        return <AccountComponent {...{ user, changeAvatar }} />;
      case ProfileTabs.BankCard:
        return <BankCardComponent {...{ user }} />;
      case ProfileTabs.Iban:
        return <IbanComponent {...{ user }} />;
      case ProfileTabs.WalletAddresses:
        return <WalletAddressComponent />;
      case ProfileTabs.CurrencyWallet:
        return <WalletPage />;
      default:
        return null;
    }
  }, [state, user]);

  if (!user)
    return (
      <>
        <UnauthenticatedContentComponent title={headerTitle} backHref="/">
          {emptyDescription}
        </UnauthenticatedContentComponent>
        <AppBottomNavComponent />
      </>
    );

  return (
    <div className={styles.userRoot}>
      <AppHeader
        bgcolor="background.paper"
        title={headerTitle}
        {...(state === ProfileTabs.CurrencyWallet
          ? {
              toolbarContent: <SupportButtonComponent sx={{ ml: "auto" }} />,
              backHref: "/",
            }
          : { backHref: "/profile" })}
      >
        <TabsComponent
          className={
            state !== ProfileTabs.BankCard && state !== ProfileTabs.Iban
              ? "hidden"
              : "desktop-down"
          }
          items={[
            { value: ProfileTabs.BankCard, title: "کارت‌های بانکی" },
            { value: ProfileTabs.Iban, title: "شباهای بانکی" },
          ]}
          active={state}
          onChange={(v) => setState(v)}
          valueSelector={(i) => i.value}
          labelSelector={(i) => i.title}
        />
      </AppHeader>
      <Toolbar
        className={
          state !== ProfileTabs.BankCard && state !== ProfileTabs.Iban
            ? "hidden"
            : "desktop-down"
        }
        sx={{ zIndex: -1 }}
      />
      <Container className={styles.container}>
        <Typography
          className={clsx(styles.title, "desktop-up")}
          component="h2"
          variant="h4"
          fontWeight={700}
        >
          پروفایل
        </Typography>
        <Grid container spacing={4}>
          <Grid
            item
            sm={4}
            md={3}
            className={clsx(styles.sidebar, "desktop-up")}
          >
            <UserAvatarComponent
              className={styles.userAvatar}
              user={user}
              onClick={changeAvatar}
            />
            <Divider className={styles.listDivider} />
            <List className={styles.list}>
              <AccountListItem
                title="حساب کاربری"
                Icon={UserOutline_2Icon}
                value={ProfileTabs.Account}
                selected={state}
                onSelect={(v) => setState(v)}
              />
              <AccountListItem
                title="آدرس‌های ارزی"
                Icon={AddressesIcon}
                value={ProfileTabs.WalletAddresses}
                selected={state}
                onSelect={(v) => setState(v)}
              />
              <AccountListItem
                title="کارت بانکی"
                Icon={BankCardIcon}
                value={ProfileTabs.BankCard}
                selected={state}
                onSelect={(v) => setState(v)}
              />
              <AccountListItem
                title="شبای بانکی"
                Icon={IbanIcon}
                value={ProfileTabs.Iban}
                selected={state}
                onSelect={(v) => setState(v)}
              />
              <AccountListItem
                title="کیف پول ریالی"
                Icon={WalletIcon}
                value={ProfileTabs.CurrencyWallet}
                selected={state}
                onSelect={(v) => setState(v)}
              />
              <Divider className={styles.listDivider} />

              <ListItem className={styles.listItem} disablePadding>
                <ListItemButton
                  onClick={logout}
                  className={styles.listItemButton}
                >
                  <ListItemIcon className={styles.listIcon}>
                    <ExitIcon color="error" />
                  </ListItemIcon>
                  <Typography color="error.main">
                    خروج از حساب کاربری
                  </Typography>
                </ListItemButton>
              </ListItem>
            </List>
          </Grid>
          <Grid className={styles.content} item xs={12} md={9}>
            <div className={styles.paper}>
              <Typography
                component="h2"
                className={clsx(styles.title, "desktop-up")}
              >
                {tabTitle}
              </Typography>
              {tabContent}
            </div>
            {Boolean(user && state === ProfileTabs.Account) && (
              <div className={clsx(styles.paper, styles.skip)}>
                <Button
                  onClick={openPasswordChange}
                  startIcon={<PasswordIcon />}
                >
                  تغییر رمزعبور
                </Button>
              </div>
            )}
          </Grid>
        </Grid>
      </Container>
      {/* <BottomNavigation
        className="desktop-down"
        sx={{ opacity: 0, zIndex: -1 }}
      /> */}
    </div>
  );
}

function AccountListItem(props: {
  title: string;
  value: ProfileTabs;
  Icon: any;
  selected: ProfileTabs;
  onSelect: (v: ProfileTabs) => void;
}) {
  const { title, value, Icon, selected, onSelect } = props;
  return (
    <ListItem className={styles.listItem} disablePadding>
      <ListItemButton
        selected={value === selected}
        onClick={() => onSelect(value)}
        className={styles.listItemButton}
      >
        <ListItemIcon className={styles.listIcon}>
          <Icon />
        </ListItemIcon>
        <Typography component="span">{title}</Typography>
      </ListItemButton>
    </ListItem>
  );
}
