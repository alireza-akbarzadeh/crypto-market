import SafeViewView from "./safe-view.view";

type PropTypes = {
  children: any;
};
export default function SafeViewComponent(props: PropTypes) {
  return <SafeViewView {...props} />;
}
