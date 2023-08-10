import { MouseEventHandler } from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import styles from "./menu-list-item.module.scss";
import ArrowForwardIcon from "@mui/icons-material/ArrowBackIos";

type Props = {
  Icon: any;
  primary: string;
  renderSecondary?: () => any;
  secondary?: string;
  skipArrow?: boolean;
  skipDivider?: boolean;
  onClick?: MouseEventHandler<HTMLLIElement>;
};
export default function MenuListItem(props: Props) {
  const {
    onClick,
    Icon,
    renderSecondary,
    secondary,
    skipArrow,
    primary,
    skipDivider,
  } = props;
  return (
    <ListItem disablePadding onClick={onClick} divider={!skipDivider}>
      <ListItemButton className={styles.listItemButton}>
        <ListItemIcon className={styles.listIcon}>
          <Icon />
        </ListItemIcon>
        <Typography className={styles.primary}>{primary}</Typography>
        {renderSecondary ? (
          renderSecondary()
        ) : secondary ? (
          secondary
        ) : !skipArrow ? (
          <ArrowForwardIcon fontSize={"inherit"} />
        ) : null}
      </ListItemButton>
    </ListItem>
  );
}
