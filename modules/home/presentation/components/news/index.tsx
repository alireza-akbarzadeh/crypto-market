import { HomeDataInterface } from "@/modules/home/domain/entities/home";
import NewsView from "./news.view";

type PropTypes = { data: HomeDataInterface["news"] };
export default function NewsComponent(props: PropTypes) {
  return <NewsView {...props} />;
}
