import useCoinPrices from "@/modules/coin/domain/usecases/useCoinPrices";
import { HomeDataInterface } from "@/modules/home/domain/entities/home";
import { useMemo, useState } from "react";
import LivePriceMinimalView from "./live-price-minimal.view";

type PropTypes = { data: HomeDataInterface["currencies"] };
export default function LivePriceMinimalComponent(props: PropTypes) {
  const [sort, setSort] = useState(0);
  const { data } = props;
  // const rows = useMemo(() => {
  //   return data.collections[sort].items;
  // }, [data, sort]);

  return (
    <LivePriceMinimalView sort={sort} handleSortChange={setSort} data={data} />
  );
}
