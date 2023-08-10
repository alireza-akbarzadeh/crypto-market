import {
  ListItem,
  Divider,
  ListItemButton,
  ListItemText,
  ListItemButtonProps,
  Skeleton,
} from "@mui/material";
import styles from "./simple-list-item.module.scss";
import ArrowForwardIcon from "@mui/icons-material/ArrowBackIos";
import { useMemo } from "react";

export type SimpleListItemType = {
  onClick?: () => void;
  primary?: string;
  component?: any;
  href?: string;
  arrow?: boolean;
} & ListItemButtonProps;
export default function SimpleListItemView(props: SimpleListItemType) {
  const { onClick, arrow, primary, ...other } = props;
  const randomLength = useMemo(() => {
    return Math.floor(Math.random() * 60) + 20;
  }, []);
  return (
    <>
      <ListItem disablePadding>
        <ListItemButton onClick={primary ? onClick : undefined} {...other}>
          <ListItemText
            primaryTypographyProps={{
              fontWeight: "300",
            }}
            primary={primary || <Skeleton width={randomLength + "%"} />}
          />
          {primary && arrow !== false && (
            <ArrowForwardIcon fontSize="small" color="disabled" />
          )}
        </ListItemButton>
      </ListItem>
      <Divider sx={{ mx: 2 }} />
    </>
  );
}
