import { CommentInterface } from "@/modules/app-properties/domain/entities/comments";
import { Avatar, Paper, PaperProps, Skeleton, Typography } from "@mui/material";
import Image from "next/image";
import styles from "./comment-card.module.scss";
import ClockIcon from "@mui/icons-material/AccessTime";
import Paragraphs from "@/core/components/common/paragraphs";
import MAIN_LOGO from "@/public/images/main-logo.svg";
import { ReplyIcon } from "@/core/components/common/custom-icon";

type PropTypes = {
  data: CommentInterface;
} & PaperProps;
export default function CommentCardView(props: PropTypes) {
  const { data, ...other } = props;
  return (
    <>
      <Paper className={styles.card} variant="outlined" {...other}>
        <div className={styles.userInfo}>
          <Avatar
            className={styles.avatar}
            // sx={{ border: 1, borderColor: "divider" }}
          >
            {data?.user?.avatar ? (
              <Image
                src={data.user.avatar}
                alt="avatar"
                width={55}
                height={55}
              />
            ) : (
              <Skeleton variant="circular" width={55} height={55} />
            )}
          </Avatar>
          <div>
            <Typography fontWeight="500" component="div">
              {data ? (
                data.user.fullName
              ) : (
                <Skeleton variant="text" width={100} />
              )}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {data ? (
                `عضویت ${data.user.createAt}`
              ) : (
                <Skeleton variant="text" />
              )}
            </Typography>
          </div>
        </div>
        {data ? (
          <Paragraphs className={styles.message}>{data.message}</Paragraphs>
        ) : (
          <Skeleton className={styles.message} variant="text" />
        )}

        <Typography
          className={styles.date}
          variant="caption"
          color="text.secondary"
        >
          {data ? (
            <>
              <span>{data.createdAt}</span>
              <ClockIcon className={styles.icon} />
            </>
          ) : (
            <Skeleton variant="text" width={70} />
          )}
        </Typography>
      </Paper>
      {(data?.replies || []).map(({ createdAt, message }, idx) => (
        <div key={idx} className={styles.replyContainer}>
          <ReplyIcon className={styles.replyIcon} color="primary" />
          <Paper
            variant="outlined"
            className={styles.card}
            sx={{ bgcolor: "primary.light" }}
          >
            <div className={styles.userInfo}>
              <Avatar className={styles.avatar} sx={{ p: 0.25 }}>
                <Image src={MAIN_LOGO} alt="avatar" width={55} height={55} />
              </Avatar>
              <div>
                <Typography fontWeight="500" component="div">
                  کریپو
                </Typography>
              </div>
            </div>
            <Paragraphs className={styles.message}>{message}</Paragraphs>
            <Typography
              className={styles.date}
              variant="caption"
              color="text.secondary"
            >
              <span>{createdAt}</span>
              <ClockIcon className={styles.icon} />
            </Typography>
          </Paper>
        </div>
      ))}
    </>
  );
}
