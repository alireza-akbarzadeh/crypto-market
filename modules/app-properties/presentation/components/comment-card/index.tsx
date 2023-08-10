import { CommentInterface } from "@/modules/app-properties/domain/entities/comments";
import { PaperProps } from "@mui/material";
import CommentCardView from "./comment-card.view";

type PropTypes = {
  data: CommentInterface;
} & PaperProps;
export default function CommentCardComponent(props: PropTypes) {
  return <CommentCardView {...props} />;
}
