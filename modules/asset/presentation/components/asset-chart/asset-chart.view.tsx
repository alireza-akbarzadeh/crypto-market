import { currencyFormat } from "@/core/helpers";
import { ButtonBase, Skeleton, Typography } from "@mui/material";
import clsx from "clsx";
import { Cell, Pie, PieChart, Sector } from "recharts";
import styles from "./asset-chart.module.scss";

type PropTypes = {
  activeIndex: number;
  data?: any[];
  handleSelect: (idx: number) => void;
  isDesktopSize: boolean;
  total?: number;
  mobileStyle?: boolean;
};
export default function AssetChartView(props: PropTypes) {
  const { activeIndex, handleSelect, isDesktopSize, data, total, mobileStyle } =
    props;
  const size = isDesktopSize ? 126 : 185;
  const outerRadius = 0.47 * size;
  const innerRadius = 0.378 * size;

  return (
    <div className={clsx(styles.root, { [styles.mobile]: mobileStyle })}>
      <div className={styles.pirWrapper}>
        {Boolean(data) && (
          <div className={styles.price}>
            <Typography component="span" className={styles.value}>
              {currencyFormat(data![activeIndex]?.value || total)}
            </Typography>
            <Typography component="span" className={styles.currency}>
              تومان
            </Typography>
          </div>
        )}
        {data ? (
          <PieChart width={size} height={size}>
            <Pie
              data={data.length ? data : [{ value: 1 }]}
              cx={outerRadius}
              cy={outerRadius}
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              fill="var(--divider)"
              paddingAngle={data.length > 1 ? 3 : 0}
              dataKey="value"
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  stroke="0"
                  onClick={() => handleSelect(index)}
                />
              ))}
            </Pie>
          </PieChart>
        ) : (
          <Skeleton
            className={styles.chartSkeleton}
            variant="circular"
            width={size}
            height={size}
          >
            <span style={{ width: innerRadius * 2, height: innerRadius * 2 }} />
          </Skeleton>
        )}
      </div>
      <div className={styles.secondSection}>
        <Typography className={styles.title}>
          {data ? "موجودی" : <Skeleton width={100} />}
        </Typography>
        <div className={styles.chips}>
          {data
            ? data.map(({ color, shortName }, idx) => (
                <ButtonBase
                  key={shortName}
                  className={clsx({
                    [styles.chip]: true,
                    [styles.active]: idx === activeIndex,
                  })}
                  onClick={() => handleSelect(idx)}
                >
                  <span
                    className={styles.dot}
                    style={{ backgroundColor: color }}
                  />
                  <Typography component="span">{shortName}</Typography>
                </ButtonBase>
              ))
            : Array(4)
                .fill("")
                .map((_, i) => (
                  <Skeleton
                    key={i}
                    className={styles.chip}
                    variant="rectangular"
                  >
                    <span className="opacity0">btc</span>
                  </Skeleton>
                ))}
        </div>
      </div>
    </div>
  );
}
function renderActiveShape(props: any) {
  const { cx, cy, fill, outerRadius, payload } = props;
  return (
    <g>
      <Typography
        className="desktop-down"
        component="text"
        x={cx}
        y={cy * 1.23}
        dy={8}
        textAnchor="middle"
        fill={fill}
      >
        {payload?.faName}
      </Typography>
      <Sector {...props} outerRadius={outerRadius * 1.0454} />
    </g>
  );
}
