import { Typography, TypographyProps } from "@mui/material";
import styles from "./loading-number.module.scss";

type PropTypes = TypographyProps;
export default function LoadingNumberView(props: PropTypes) {
  return <Typography {...props} />;
}
