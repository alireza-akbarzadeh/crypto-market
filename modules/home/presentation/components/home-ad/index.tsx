// import { HomeDataInterface } from "@/modules/home/domain/entities/home";
import { useIsPwa } from "@/core/hooks";
import HomeAdView from "./home-ad.view";

type PropTypes = {
  //  data: HomeDataInterface["ad"]
};
export default function HomeAdComponent(props: PropTypes) {
  const isStandalone = useIsPwa();
  if (isStandalone) return null;
  return <HomeAdView {...props} />;
}
