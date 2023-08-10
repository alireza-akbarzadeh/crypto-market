import { Typography } from "@mui/material";
import clsx from "clsx";
import styles from "./reg-list-checker.module.scss";

type PropTypes = {
  title?: string;
  list: { title: string; fulfilled: boolean }[];
};
export default function RegListCheckerView(props: PropTypes) {
  const { title, list } = props;
  return (
    <div className={styles.root}>
      <Typography className={styles.title}>{title}</Typography>
      <div className={styles.list}>
        {list.map((item, index) => (
          <Typography
            key={index}
            className={clsx({
              [styles.listItem]: true,
              [styles.fulfilled]: item.fulfilled,
            })}
          >
            {item.title}
          </Typography>
        ))}
      </div>
    </div>
  );
}
