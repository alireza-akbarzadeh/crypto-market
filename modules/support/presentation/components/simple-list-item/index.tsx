import SimpleListItemView, {
  SimpleListItemType,
} from "./simple-list-item.view";

type PropTypes = SimpleListItemType;
export default function SimpleListItemComponent(props: PropTypes) {
  return <SimpleListItemView {...props} />;
}
