import styles from "./support-content.module.scss";
import Image from "next/image";
import SupportModalWrapperComponent from "../support-modal";
import ROBOT from "@/public/images/bot.png";
import {
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
// ***Icons***
import supportIcon from "@/public/icons/supportIcon.png";
import newComersIcon from "@/public/icons/newUsers.png";
import ticketsIcon from "@/public/icons/ticketsIcon.png";
import newTicketIcon from "@/public/icons/newTicketIcon.png";
import bitgapIcon from "@/public/icons/bitgap.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowBackIos";
import CloseIcon from "@mui/icons-material/Close";
import BackIcon from "@mui/icons-material/ArrowBack";
// social
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FadeContent from "@/core/components/common/fade-content";
import NewComersComponent from "../new-comers";
import { UserInterface } from "@/modules/auth/domain/entities/user";
import { currencyFormat } from "@/core/helpers";
import NewTicketComponent from "../new-ticket";
import {
  TicketCategoryInterface,
  TicketFormValues,
} from "@/modules/support/domain/entities/ticket";
import ComposeTicketComponent from "../compose-ticket";
import MyTicketsComponent from "../my-tickets";
import MinimizeIcon from "@mui/icons-material/Minimize";
import { useTokenRoute } from "@/core/hooks";

export enum SupportStack {
  NewComers,
  Tickets,
  NewTicket,
  MyTickets,
  ComposeTicket,
}
const socials = [
  {
    href: "tel:02191079677",
    Icon: PhoneIcon,
  },
  { href: "mailto: crypto.net@gmail.com", Icon: MailIcon },
  {
    href: "https://www.instagram.com/crypto24/",
    target: "_blank",
    rel: "noreferrer noopener",
    Icon: InstagramIcon,
  },
  {
    href: "https://t.me/crypto24",
    target: "_blank",
    rel: "noreferrer noopener",
    Icon: TelegramIcon,
  },
  {
    href: "https://mobile.twitter.com/crypto",
    target: "_blank",
    rel: "noreferrer noopener",
    Icon: TwitterIcon,
  },
];
type PropTypes = {
  stack: SupportStack[];
  onBack: () => void;
  onClose: () => void;
  user?: UserInterface;
  onPush: (page: SupportStack) => void;
  openNewTicket: () => void;
  openMyTickets: () => void;
  openTicket: () => void;
  handleCategorySelect: (category: TicketCategoryInterface) => void;
  ticketCategory?: TicketCategoryInterface;
  ticketOpen: boolean;
  openCrisp: () => void;
  crispDisabled: boolean;
  crispOpen: boolean;
  handleTicketSubmit: (model: TicketFormValues) => void;
  appInitials: any;
};
export default function SupportContentView(props: PropTypes) {
  const {
    stack,
    onBack,
    onClose,
    user,
    onPush,
    openNewTicket,
    openMyTickets,
    handleCategorySelect,
    ticketCategory,
    ticketOpen,
    openCrisp,
    crispDisabled,
    crispOpen,
    openTicket,
    handleTicketSubmit,
    appInitials,
  } = props;
  const page = stack[0];
  const bitgapHref = useTokenRoute()("/bitgap");

  return (
    <>
      <div className={styles.header}>
        <div className={styles.bot}>
          <div className={styles.radar}>
            <span />
            <span />
            <span />
          </div>
          <Image src={ROBOT} alt="robot" />
        </div>
        <div className={styles.headRow}>
          <Typography
            className={styles.title}
            variant="h6"
            component="h2"
            fontWeight={700}
          >
            پشتیبانی آنلاین کریپو
          </Typography>
          {/* <IconButton
            onClick={onClose}
            className={styles.closeBtn}
            color="inherit"
          >
            <MinimizeIcon />
          </IconButton> */}
          <IconButton
            onClick={stack.length ? onBack : onClose}
            className={styles.closeBtn}
            color="inherit"
            edge="end"
          >
            {stack.length ? <BackIcon /> : <CloseIcon />}
          </IconButton>
        </div>

        <div className={styles.socials}>
          {socials.map(({ href, Icon, ...other }) => (
            <IconButton
              key={href}
              component="a"
              href={href}
              className={styles.socialBtn}
              color="inherit"
              size="small"
              {...other}
            >
              <Icon />
            </IconButton>
          ))}
        </div>
      </div>
      <div className={styles.content}>
        <FadeContent
          variable={page}
          containerProps={{ sx: { height: "100%" } }}
        >
          {(variable) => {
            switch (variable) {
              case SupportStack.NewComers:
                return <NewComersComponent />;
              case SupportStack.Tickets:
                return (
                  <>
                    <Typography variant="h6" fontWeight={500} sx={{ mb: 2 }}>
                      {user?.firstName || "کاربر"} عزیز،
                    </Typography>
                    <Typography sx={{ mb: 2 }}>
                      شما در این بخش میتوانید تیکت جدید ثبت و یا تیکت های از قبل
                      ایجاد شده را مشاهده کنید.
                    </Typography>
                    <List className={styles.mainMenu}>
                      <MainMenuListItem
                        title="ثبت تیکت جدید"
                        icon={newTicketIcon}
                        onClick={openNewTicket}
                      />
                      <MainMenuListItem
                        title="تیکت های من"
                        onClick={openMyTickets}
                        icon={ticketsIcon}
                      />
                    </List>
                  </>
                );
              case SupportStack.NewTicket:
                return <NewTicketComponent onSelect={handleCategorySelect} />;
              case SupportStack.MyTickets:
                return (
                  <MyTicketsComponent onSelect={openTicket} open={ticketOpen} />
                );
              case SupportStack.ComposeTicket:
                return (
                  <ComposeTicketComponent
                    category={ticketCategory}
                    onSubmit={handleTicketSubmit}
                  />
                );
              default:
                return (
                  <>
                    <Typography variant="h6" fontWeight={500} sx={{ mb: 2 }}>
                      {user?.firstName || "کاربر"} عزیز،
                    </Typography>
                    <Typography sx={{ mb: 2 }}>
                      کریپو، ۷ روز هفته، ۲۴ ساعت شبانه‌روز پاسخگوی شماست.
                    </Typography>
                    <List className={styles.mainMenu}>
                      <MainMenuListItem
                        title="کاربران تازه وارد"
                        icon={newComersIcon}
                        onClick={() => onPush(SupportStack.NewComers)}
                      />
                      <MainMenuListItem
                        title="ارتباط با پشتیبانی"
                        secondary={
                          appInitials?.crisp.enable ? (
                            <>
                              <span className="online-dot" />
                              آنلاین
                            </>
                          ) : (
                            "آفلاین"
                          )
                        }
                        disabled={crispDisabled}
                        onClick={openCrisp}
                        icon={supportIcon}
                      />

                      <MainMenuListItem
                        onClick={() => onPush(SupportStack.Tickets)}
                        title="ثبت یا پیگیری تیکت"
                        icon={ticketsIcon}
                      />
                      <MainMenuListItem
                        component="a"
                        href={bitgapHref}
                        target="_blank"
                        rel="noreferrer noopener"
                        title="بیت گپ"
                        secondary={
                          <>
                            <span className="online-dot" /> آنلاین
                            {/* {currencyFormat(12983) + " نفر آنلاین"} */}
                          </>
                        }
                        icon={bitgapIcon}
                      />
                    </List>
                  </>
                );
            }
          }}
        </FadeContent>
      </div>
    </>
  );
}
function MainMenuListItem({
  onClick,
  title,
  secondary,
  icon,
  disabled,
  ...other
}: any) {
  return (
    <ListItem className={styles.mainMenuListItem} {...other}>
      <ListItemButton
        className={styles.menuButton}
        sx={{ bgcolor: "background.paper" }}
        disabled={disabled}
        onClick={onClick}
      >
        <ListItemIcon className={styles.icon}>
          <Image src={icon} alt={title} width={35} height={35} />
        </ListItemIcon>
        <Typography variant="body2" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        {secondary && (
          <>
            <Typography variant="body2" color="GrayText">
              {secondary}
            </Typography>
          </>
        )}
        <ArrowForwardIcon color="disabled" sx={{ ml: 1 }} fontSize="small" />
      </ListItemButton>
    </ListItem>
  );
}
