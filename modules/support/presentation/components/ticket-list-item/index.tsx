import { TicketInterface } from "@/modules/support/domain/entities/ticket";
import TicketListItemView from "./ticket-list-item.view";

type PropTypes = {
  data: TicketInterface;
  onClick: () => void;
};
export default function TicketListItemComponent(props: PropTypes) {
  return <TicketListItemView {...props} />;
}
