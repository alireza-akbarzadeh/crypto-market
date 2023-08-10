import CoinAreaChartView from "./coin-area-chart.view";
type PropTypes<T extends { [key: string]: any }> = {
  data: T[];
  color?: string;
  dataKey: keyof T;
};
export default function CoinAreaChartComponent<T>(props: PropTypes<T>) {
  return <CoinAreaChartView {...props} />;
}
