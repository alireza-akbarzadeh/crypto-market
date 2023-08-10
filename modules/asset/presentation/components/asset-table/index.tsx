import { useIsDesktopSize } from "@/core/hooks";
import AssetTableView from "./asset-table.view";

type PropTypes = { openAddModal: () => void };
export default function AssetTableComponent(props: PropTypes) {
  const isDesktopSize = useIsDesktopSize();
  return <AssetTableView {...{ isDesktopSize, ...props }} />;
}
