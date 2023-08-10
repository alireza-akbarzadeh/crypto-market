import { useIsMobileSize, useSelector } from "@/core/hooks";
import SupportModalView from "./support-modal.view";

type PropTypes = {};
export default function SupportModalComponent(props: PropTypes) {
  const isMobileSize = useIsMobileSize();
  const { isSupportOpen } = useSelector((s) => s.support);
  return <SupportModalView {...{ open: isSupportOpen, isMobileSize }} />;
}
