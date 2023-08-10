import { useCrisp, useTokenRoute } from "@/core/hooks";
import AppFooterView from "./app-footer.view";

type PropTypes = {};
export default function AppFooterComponent(props: PropTypes) {
  const { open } = useCrisp();
  const bitgapHref = useTokenRoute()("/bitgap");
  return <AppFooterView openCrisp={open} bitgapHref={bitgapHref} />;
}
