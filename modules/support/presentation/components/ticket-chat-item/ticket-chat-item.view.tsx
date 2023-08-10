import styles from "./ticket-chat-item.module.scss";
import { Box, Paper, Button, InputBase, Typography } from "@mui/material";
import SendingIcon from "@mui/icons-material/AccessTime";
import clsx from "clsx";
import { TicketChatItemInterface } from "@/modules/support/domain/entities/ticket";
import PrivateImageComponent from "@/core/components/common/private-image";
import moment from "moment-jalaali";

type PropTypes = {
  data: TicketChatItemInterface;
};
export default function TicketChatItemView(props: PropTypes) {
  const { data } = props;
  if (!data) return null;
  return (
    <div
      className={clsx(styles.chatBoxWrapper, data.owner ? styles.customer : "")}
    >
      <Box
        className={styles.chatBox}
        bgcolor={data.owner ? "primary.main" : "background.default"}
        color={data.owner ? "primary.contrastText" : undefined}
      >
        {Boolean(data.attachment) && (
          <div className={styles.imageContainer}>
            <PrivateImageComponent src={data.attachment} />
          </div>
        )}
        <Typography className={styles.message}>{data.message}</Typography>
        <Typography className={styles.time} variant="caption">
          {data.date ? (
            moment(data.date).format("HH:mm")
          ) : (
            <SendingIcon fontSize="inherit" />
          )}
        </Typography>
      </Box>
    </div>
  );
}
