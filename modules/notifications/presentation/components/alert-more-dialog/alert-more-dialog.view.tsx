import styles from "./alert-more-dialog.module.scss";
import AppDialogComponent from "@/core/components/common/app-dialog";
import { TrashIcon } from "@/core/components/common/custom-icon";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";

type PropTypes = {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
};

export default function AlertMoreDialogView(props: PropTypes) {
  const { open, onClose, onDelete } = props;
  return (
    <AppDialogComponent open={open} onClose={onClose} mobileStyle={4}>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={onDelete}>
            <ListItemIcon className={styles.listItemIcon}>
              <TrashIcon />
            </ListItemIcon>
            <Typography>حذف هشدار</Typography>
          </ListItemButton>
        </ListItem>
      </List>
    </AppDialogComponent>
  );
}
