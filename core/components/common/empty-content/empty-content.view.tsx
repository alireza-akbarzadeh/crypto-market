import styles from "./empty-content.module.scss";
import EMPTY_IMAGE from "@/public/images/empty.svg";
import Image from "next/image";
import { Button, Typography, Box, BoxProps } from "@mui/material";
import clsx from "clsx";

type PropTypes = {
  message: string;
  small?: boolean;
  buttonProps?: {
    onClick: () => void;
    label: string;
  };
} & BoxProps;
export default function EmptyContentView(props: PropTypes) {
  const { buttonProps, message, small, className, ...other } = props;
  return (
    <Box className={clsx(styles.emptyContent, className)} {...other}>
      <div className={clsx({ [styles.image]: true, [styles.small]: small })}>
        <Image src={EMPTY_IMAGE} alt="empty" layout="responsive" />
      </div>
      <Typography className={styles.desc}>{message}</Typography>
      {Boolean(buttonProps) && (
        <Button variant="contained" fullWidth onClick={buttonProps!.onClick}>
          {buttonProps!.label}
        </Button>
      )}
    </Box>
  );
}
