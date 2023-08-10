import { HomeDataInterface } from "@/modules/home/domain/entities/home";
import AnalysisView from "./analysis.view";

type PropTypes = {
  data: HomeDataInterface["analysis"];
};
export default function AnalysisComponent(props: PropTypes) {
  return <AnalysisView {...props} />;
}
