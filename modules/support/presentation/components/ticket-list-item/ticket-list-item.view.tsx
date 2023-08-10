import {
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Skeleton,
  Typography,
} from "@mui/material";
import Image from "next/image";
import styles from "./ticket-list-item.module.scss";
import ArrowForwardIcon from "@mui/icons-material/ArrowBackIos";
import successIcon from "@/public/icons/kyc-state-1.png";
import dangerIcon from "@/public/icons/kyc-state-2.png";
import warningIcon from "@/public/icons/kyc-state-3.png";
import { TicketStatus } from "@/core/enums/ticket.enums";
import { useMemo } from "react";
import { TicketInterface } from "@/modules/support/domain/entities/ticket";

const StatusMap = {
  [TicketStatus.Pending]: "در حال بررسی",
  [TicketStatus.Done]: "انجام شده",
};

type PropTypes = {
  data?: TicketInterface;
  onClick: () => void;
};
export default function TicketListItemView(props: PropTypes) {
  const { data, onClick } = props;
  const icon = useMemo(() => {
    if (!data) return;
    switch (data.status) {
      case TicketStatus.Done:
        return successIcon;
      default:
        return warningIcon;
    }
  }, [data?.status]);

  return (
    <ListItem className={styles.root}>
      <ListItemButton
        className={styles.menuButton}
        sx={{ bgcolor: "background.paper" }}
        disabled={!data}
        onClick={onClick}
      >
        <ListItemIcon className={styles.icon}>
          {icon ? (
            <Image src={icon} alt={"icon"} width={35} height={35} />
          ) : (
            <Skeleton variant="circular" width={35} height={35} />
          )}
        </ListItemIcon>
        <Box sx={{ flexGrow: 1, pl: 1 }}>
          <Typography
            className={
              data?.status === TicketStatus.Done ? styles.done : styles.pending
            }
          >
            {data ? StatusMap[data.status] : <Skeleton width={60} />}
          </Typography>
          <Typography>
            {data ? data.categoryTitle : <Skeleton width={120} />}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography component="span">
              {data ? (
                `شماره تیکت: ${data.ticketNumber}`
              ) : (
                <Skeleton width={50} />
              )}
            </Typography>
            <Typography variant="caption" color="GrayText" component="span">
              {data ? data.createdAt : <Skeleton width={30} />}
            </Typography>
          </Box>
        </Box>
        <ArrowForwardIcon color="disabled" sx={{ ml: 1 }} fontSize="small" />
      </ListItemButton>
    </ListItem>
  );
}
