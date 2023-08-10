import clsx from "clsx";
import { ReactNode } from "react";
import styles from "./balance-box.module.scss";

type PropTypes = {
  children: ReactNode;
  className?: string;
};
export default function BalanceBoxView(props: PropTypes) {
  const { children, className } = props;
  return (
    <div className={clsx(styles.balanceBox, className)}>
      <div className={styles.circles} />
      {children}
    </div>
  );
}
