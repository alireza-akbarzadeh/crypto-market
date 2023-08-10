import styles from "./user-avatar.module.scss";
import { Avatar, ButtonBase, Typography } from "@mui/material";
import Image from "next/image";
import Rating from "@/core/components/common/rating";
import { UserInterface } from "@/modules/auth/domain/entities/user";
import clsx from "clsx";

type PropTypes = {
  user: UserInterface;
  className?: string;
  onClick?: () => void;
};
export default function UserAvatarView(props: PropTypes) {
  const { user, className, onClick } = props;
  return (
    <div className={clsx(styles.root, className)}>
      <Avatar onClick={onClick} className={styles.avatar}>
        <ButtonBase component="div">
          {Boolean(user.avatar) && (
            <Image src={user.avatar!} alt="avatar" width={55} height={55} />
          )}
        </ButtonBase>
      </Avatar>
      <Typography component="span" variant="body2">
        {user.fullName}
      </Typography>
      <Rating sx={{ my: 0.5 }} defaultValue={user.rate} readOnly />
    </div>
  );
}
