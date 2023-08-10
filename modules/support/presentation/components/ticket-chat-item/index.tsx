import { TicketChatItemInterface } from "@/modules/support/domain/entities/ticket";
import TicketChatItemView from "./ticket-chat-item.view";

type PropTypes = { data: TicketChatItemInterface };
export default function TicketChatItemComponent(props: PropTypes) {
  return <TicketChatItemView {...props} />;
}
