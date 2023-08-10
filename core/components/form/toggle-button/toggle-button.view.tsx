import { Button, ButtonProps } from "@mui/material";
import clsx from "clsx";
import styles from "./toggle-button.module.scss";

type PropTypes = { selected?: boolean } & ButtonProps;
export default function ToggleButtonView(props: PropTypes) {
  const { className, selected, ...other } = props;
  return (
    <Button
      className={clsx({
        [styles.root]: true,
        [styles.selected]: selected,
        [className || ""]: true,
      })}
      color={selected ? "primary" : "inherit"}
      {...other}
    />
  );
}
