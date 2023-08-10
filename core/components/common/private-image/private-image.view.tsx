import { Skeleton } from "@mui/material";
import styles from "./private-image.module.scss";

export type PrivateImageViewProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;
export default function PrivateImageView(props: PrivateImageViewProps) {
  if (!props.src) {
    return <Skeleton className={styles.placeholder} variant="rectangular" />;
  }
  return <img {...props} />;
}
