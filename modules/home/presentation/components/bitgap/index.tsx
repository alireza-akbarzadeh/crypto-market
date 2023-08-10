import { HomeDataInterface } from "@/modules/home/domain/entities/home";
import { useMemo, useState } from "react";
import BitgapView from "./bitgap.view";

type PropTypes = { data: HomeDataInterface["gaps"] };
export default function BitgapComponent(props: PropTypes) {
  const { data } = props;
  const [sort, setSort] = useState(0);
  // const rows = useMemo(() => {
  //   if (sort) return data.mostVisitedGaps;
  //   return data.newestGaps;
  // }, [data, sort]);

  return <BitgapView {...{ data, sort, handleSortChange: setSort }} />;
}
