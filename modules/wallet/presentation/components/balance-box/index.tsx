import { ReactNode } from "react";
import BalanceBoxView from "./balance-box.view";

type PropTypes = { children: ReactNode; className?: string };
export default function BalanceBoxComponent(props: PropTypes) {
  return <BalanceBoxView {...props} />;
}
