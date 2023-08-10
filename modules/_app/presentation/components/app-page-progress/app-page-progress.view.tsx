import clsx from "clsx";
import styles from "./app-page-progress.module.scss";

type PropTypes = {
  className?: string;
  progress?: boolean;
};
export default function AppPageProgressView(props: PropTypes) {
  const { className, progress } = props;
  return (
    <div
      className={clsx(
        styles.root,
        progress === undefined
          ? ""
          : progress
          ? styles.started
          : styles.stopped,
        className
      )}
    >
      <div className={styles.glow} />
    </div>
  );
}
