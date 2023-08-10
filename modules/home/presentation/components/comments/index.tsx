import { HomeDataInterface } from "@/modules/home/domain/entities/home";
import CommentsView from "./comments.view";

type PropTypes = { data: HomeDataInterface["comments"] };
export default function CommentsComponent(props: PropTypes) {
  return <CommentsView {...props} />;
}
