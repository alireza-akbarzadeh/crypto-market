import styles from "./ticket-chat-modal.module.scss";
import SlideUp from "@/core/components/common/slide-up";
import { Box, Paper, Button, InputBase, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AttachIcon from "@mui/icons-material/AttachFile";
import TicketChatItemComponent from "../ticket-chat-item";
import { TicketChatItemInterface } from "@/modules/support/domain/entities/ticket";

type PropTypes = {
  open: boolean;
  handleScroll: (e: any) => void;
  message: string;
  setMessage: (message: string) => void;
  onSend: (e: any) => void;
  onFileSelect: (file: any) => void;
  imagePrev: any;
  rows: (TicketChatItemInterface | string)[];
};
export default function TicketChatModalView(props: PropTypes) {
  const {
    open,
    handleScroll,
    message,
    setMessage,
    onSend,
    onFileSelect,
    imagePrev,
    rows,
  } = props;
  return (
    <SlideUp in={open}>
      <Paper className={styles.chatModalContainer}>
        {/* {JSON.stringify(selectedTicket)} */}
        <div className={styles.chatRoot}>
          <div className={styles.header} />
          <div className={styles.body} onScroll={handleScroll}>
            {rows.map((item) => {
              if (typeof item === "string") {
                return (
                  <Typography
                    component="div"
                    className={styles.date}
                    key={item}
                  >
                    {item}
                  </Typography>
                );
              }
              return <TicketChatItemComponent key={item.id} data={item} />;
            })}
          </div>
          <Paper className={styles.footer}>
            <Box bgcolor="background.secondary" className={styles.chatBox}>
              <Button
                className={styles.attachButton}
                onMouseDown={(e: any) => e.preventDefault()}
                color="primary"
                variant="contained"
                component="label"
              >
                <AttachIcon />
                <input
                  type="file"
                  accept="image/png, image/gif, image/jpeg"
                  hidden
                  onChange={onFileSelect}
                />
              </Button>
              <div className={styles.inputContainer}>
                {Boolean(imagePrev) && (
                  <div className={styles.previewContainer}>
                    <img src={imagePrev as any} />
                  </div>
                )}

                <InputBase
                  className={styles.input}
                  type="text"
                  placeholder="پیام خود را بنویسید..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={onSend}
                />
              </div>
            </Box>
            <Button
              onClick={onSend}
              onMouseDown={(e) => e.preventDefault()}
              className={styles.sendButton}
              color="primary"
              variant="contained"
            >
              <SendIcon />
            </Button>
          </Paper>
        </div>
      </Paper>
    </SlideUp>
  );
}
