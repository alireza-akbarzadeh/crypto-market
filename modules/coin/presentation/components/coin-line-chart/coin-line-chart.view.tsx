import styles from "./coin-line-chart.module.scss";
import {
  SymbolOverview,
  SymbolOverviewProps,
} from "react-ts-tradingview-widgets";
import { useTheme } from "@mui/material/styles";
import { alpha } from "@mui/system";
import { TradeInterface } from "@/modules/asset/domain/entities/asset";
import { memo, useMemo } from "react";

type PropTypes = { coin: string } & SymbolOverviewProps;
export default function CoinLineChartView(props: PropTypes) {
  const { coin, ...other } = props;
  const theme = useTheme();

  const symbol = useMemo(() => {
    if (coin === "USDT") return "BINANCEUS:USDTUSD|ALL";
    return `BINANCE:${coin}USDT`;
  }, [coin]);
  const color = theme.palette.primary.main;

  return <Chart {...{ symbol, color, theme: theme.palette.mode, ...other }} />;
}

const Chart = memo(
  (props: { symbol: string; theme: any; color: string }) => {
    const { symbol, theme, color, ...other } = props;
    return (
      <SymbolOverview
        colorTheme={theme}
        autosize
        symbols={[[symbol]]}
        lineColor={color}
        topColor={alpha(color, 0.3)}
        bottomColor={alpha(color, 0)}
        isTransparent
        {...other}
      />
    );
  },
  (prev, next) => prev.symbol === next.symbol && prev.theme === next.theme
);
