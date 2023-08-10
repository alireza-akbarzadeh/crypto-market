import styles from "./account.module.scss";
import { Typography, Paper, List, ListItem, Grid } from "@mui/material";
import { UserInterface } from "@/modules/auth/domain/entities/user";
import UserAvatarComponent from "../user-avatar";

type PropTypes = {
  user: UserInterface;
  isDesktopSize: boolean;
  changeAvatar: () => void;
};
export default function AccountView(props: PropTypes) {
  const { user, isDesktopSize, changeAvatar } = props;
  if (isDesktopSize) {
    return (
      <Grid className={styles.root} container>
        <Grid item xs={5}>
          <div className={styles.item}>
            <Typography className={styles.itemTitle} component="div">
              نام و نام خانوادگی
            </Typography>
            <Typography
              className={styles.itemValue}
              variant="h6"
              component="div"
            >
              {user.fullName}
            </Typography>
          </div>
          <div className={styles.item}>
            <Typography className={styles.itemTitle} component="div">
              تاریخ تولد
            </Typography>
            <Typography
              className={styles.itemValue}
              variant="h6"
              component="div"
            >
              {user.birthDate || "-"}
            </Typography>
          </div>
          <div className={styles.item}>
            <Typography className={styles.itemTitle} component="div">
              نام پدر
            </Typography>
            <Typography
              className={styles.itemValue}
              variant="h6"
              component="div"
            >
              {user.fatherName || "-"}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={7}>
          <div className={styles.item}>
            <Typography className={styles.itemTitle} component="div">
              شماره موبایل
            </Typography>
            <Typography
              className={styles.itemValue}
              variant="h6"
              component="div"
            >
              {user.phoneNumber}
            </Typography>
          </div>
          <div className={styles.item}>
            <Typography className={styles.itemTitle} component="div">
              کد ملی
            </Typography>
            <Typography
              className={styles.itemValue}
              variant="h6"
              component="div"
            >
              {user.nationalCode || "-"}
            </Typography>
          </div>
          <div className={styles.item}>
            <Typography className={styles.itemTitle} component="div">
              تاریخ عضویت
            </Typography>
            <Typography
              className={styles.itemValue}
              variant="h6"
              component="div"
            >
              {user.joinedAt}
            </Typography>
          </div>
        </Grid>
      </Grid>
    );
  }
  return (
    <>
      <UserAvatarComponent user={user} onClick={changeAvatar} />
      <Typography sx={{ my: 1 }}>مشخصات حساب کاربری:</Typography>
      <Paper sx={{ py: 0.5, px: 1.5 }}>
        <List disablePadding>
          <ListItem className={styles.listItem} divider>
            <Typography component="span" color="text.secondary">
              نام و نام خانوادگی:
            </Typography>
            <Typography component="span">{user.fullName}</Typography>
          </ListItem>
          <ListItem className={styles.listItem} divider>
            <Typography component="span" color="text.secondary">
              شماره موبایل:
            </Typography>
            <Typography component="span">{user.phoneNumber}</Typography>
          </ListItem>
          <ListItem className={styles.listItem} divider>
            <Typography component="span" color="text.secondary">
              نام پدر:
            </Typography>
            <Typography component="span">{user.fatherName || "-"}</Typography>
          </ListItem>
          <ListItem className={styles.listItem} divider>
            <Typography component="span" color="text.secondary">
              تاریخ تولد:
            </Typography>
            <Typography component="span">{user.birthDate || "-"}</Typography>
          </ListItem>
          <ListItem className={styles.listItem} divider>
            <Typography component="span" color="text.secondary">
              کد ملی:
            </Typography>
            <Typography component="span">{user.nationalCode || "-"}</Typography>
          </ListItem>
          <ListItem className={styles.listItem}>
            <Typography component="span" color="text.secondary">
              تاریخ عضویت:
            </Typography>
            <Typography component="span">{user.joinedAt}</Typography>
          </ListItem>
        </List>
      </Paper>
    </>
  );
}
