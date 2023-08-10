import { CircularProgress, Typography, TypographyProps } from "@mui/material";
import clsx from "clsx";
import styles from "./text-button.module.scss";

type PropTypes = { disabled?: boolean; loading?: boolean } & TypographyProps;
export default function TextButtonView(props: PropTypes) {
  const { className, disabled, children, loading, ...other } = props;
  return (
    <Typography
      color={disabled ? "text.disabled" : "primary"}
      className={clsx({
        [styles.root]: true,
        [className || ""]: true,
        disabled,
      })}
      component="span"
      {...other}
    >
      {children}
      {loading && (
        <CircularProgress
          className={styles.loading}
          size={16}
          color="inherit"
        />
      )}
    </Typography>
  );
}
