import dynamic from "next/dynamic";
import { SymbolOverviewProps } from "react-ts-tradingview-widgets";
const CoinLineChartView = dynamic(() => import("./coin-line-chart.view"), {
  ssr: false,
});

type PropTypes = { coin: string } & SymbolOverviewProps;

export default function CoinLineChartComponent(props: PropTypes) {
  return <CoinLineChartView {...props} />;
}
