import { AssetInterface } from "@/modules/asset/domain/entities/asset";
import AssetCategoryListItemView from "./asset-category-list-item.view";

type PropTypes = {
  data?: AssetInterface;
  isFirst: boolean;
};
export default function AssetCategoryListItemComponent(props: PropTypes) {
  return <AssetCategoryListItemView {...props} />;
}
