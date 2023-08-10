import AppDialogComponent from "@/core/components/common/app-dialog";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  Typography,
} from "@mui/material";
import styles from "./pwa-modal.module.scss";
import Image from "next/image";
import PWA_LOGO from "@/public/pwa/icons/icon-192x192.png";
import {
  IosAddIcon,
  IosShareIcon,
  IosAddTextIcon,
} from "@/core/components/common/custom-icon";

type PropTypes = {
  open: boolean;
  onClose: () => void;
  items: { title: string; icon: any }[];
};
export default function PwaModalView(props: PropTypes) {
  const { open, onClose, items } = props;
  return (
    <AppDialogComponent
      open={open}
      onClose={onClose}
      mobileStyle={4}
      className={styles.root}
      contentClassName={styles.container}
      // headerClassName="d-none"
    >
      <div className={styles.imageWrapper}>
        <Image src={PWA_LOGO} width={192} height={192} />
      </div>
      <Typography align="center" fontWeight={700} variant="h6" component="h2">
        وب‌اپلیکیشن بیت‌برگ را به صفحه موبایل خود اضافه کنید.
      </Typography>
      <Divider sx={{ my: 2 }} />
      <List className={styles.list}>
        {items.map(({ title, icon: Icon }, idx) => (
          <ListItem key={title}>
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
            <Typography
              className={styles.listDesk}
              dangerouslySetInnerHTML={{ __html: `${idx + 1} - ${title}` }}
            />
          </ListItem>
        ))}
      </List>
    </AppDialogComponent>
  );
}
