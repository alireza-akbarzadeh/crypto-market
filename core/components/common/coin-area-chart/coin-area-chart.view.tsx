import styles from "./coin-area-chart.module.scss";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { alpha } from "@mui/system";

type PropTypes<T extends { [key: string]: any }> = {
  data: T[];
  color?: string;
  dataKey: keyof T;
};
export default function CoinAreaChartView<T>(props: PropTypes<T>) {
  const { data, color = "#000", dataKey } = props;
  const id = "linear_" + color;
  return (
    <div className={styles.root}>
      <ResponsiveContainer width='100%' height='100%'>
        <AreaChart
          width={200}
          height={60}
          data={data}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id={id} x1='0' y1='0' x2='0' y2='1'>
              {/* <stop stopColor={color} stopOpacity="0.04" /> */}
              <stop offset='0' stopColor={color} stopOpacity='0.125' />
              <stop offset='0.55' stopColor={color} stopOpacity='0.125' />
              <stop offset='1' stopColor={color} stopOpacity='0' />
            </linearGradient>
            {/* <linearGradient
              id={id}
              x1="26.75"
              y1="0"
              x2="26.75"
              y2="30"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor={color} stopOpacity="0.04" />
              <stop offset="0.557292" stopColor={color} stopOpacity="0.5" />
              <stop offset="1" stopColor={alpha(color, 0)} />
            </linearGradient> */}
          </defs>
          <Area
            isAnimationActive={false}
            type='monotone'
            dataKey={dataKey as any}
            stroke={color}
            strokeWidth='1.2'
            fillOpacity={1}
            fill={`url(#${id})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
