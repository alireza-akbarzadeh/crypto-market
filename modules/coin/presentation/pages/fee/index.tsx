import { useIsDesktopSize } from "@/core/hooks";
// import FeeView from "./fee.view";
import dynamic from "next/dynamic";
const FeeView = dynamic(() => import("./fee.view"), { ssr: false });

type PropTypes = {};
export default function FeePage(props: PropTypes) {
  const isDesktopSize = useIsDesktopSize();
  return <FeeView {...{ isDesktopSize }} />;
}
