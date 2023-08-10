import PriceLineView from "./price-line.view";

type PropTypes = {
  children: any;
  value?: number | null;
  tooltip?: any;
  fontWeight?: any;
  loading?: boolean;
  loadingLength?: number;
  divider?: boolean;
};
export default function PriceLineComponent(props: PropTypes) {
  return <PriceLineView {...props} />;
}
