import { Suspense, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useIsDesktopSize } from "@/core/hooks";
import {
  AssetSummeryInterface,
  AssetSummeryPie,
} from "@/modules/asset/domain/entities/asset";

const AssetChartView = dynamic(() => import("./asset-chart.view"), {
  ssr: false,
  // loading: ({ error, isLoading, pastDelay }) => <div>LOADING...</div>,
});

type PropTypes = {
  total?: number;
  pie?: AssetSummeryPie;
  mobileStyle?: boolean;
  maxLength?: number;
};
export default function AssetChartComponent(props: PropTypes) {
  const { total, pie: pieProps, mobileStyle, maxLength = 5 } = props;
  const [active, setActive] = useState(0);
  const isDesktopSize = useIsDesktopSize();
  const handleSelect = (idx: number) => {
    setActive((a) => (a === idx ? -1 : idx));
  };

  const pie = useMemo(() => {
    if (!pieProps || typeof total !== "number") return;

    // debugger;
    const arr = [...pieProps];
    let remain =
      arr?.length < maxLength
        ? 0
        : total -
          arr.reduce((prev: number, next: any) => {
            if (!next.value) return prev;
            return prev + next.value;
          }, 0);

    if (remain) remain = Math.floor(Math.abs(remain));

    if (remain && arr?.length === maxLength) {
      arr.push({
        color: "#999",
        faName: "ارزهای دیگر",
        shortName: "Other",
        value: remain,
      });
    }

    return arr;
  }, [pieProps]);

  return (
    <AssetChartView
      {...{
        data: pie,
        total,
        activeIndex: active,
        handleSelect,
        isDesktopSize: isDesktopSize && !mobileStyle,
        mobileStyle,
      }}
    />
  );
}
