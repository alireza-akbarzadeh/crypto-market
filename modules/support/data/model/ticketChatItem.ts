import moment from "moment-jalaali";
import { TicketChatItemInterface } from "../../domain/entities/ticket";

export default function ticketChatItemModelMapper(
  data: any
): TicketChatItemInterface {
  const { id, description, attachment, owner, createdAt } = data;
  return {
    id: `${id}`,
    message: description,
    attachment: attachment,
    owner: owner,
    date: createdAt,
    day: createdAt ? moment(createdAt).format("jDD jMMMM jYYYY") : undefined,
  };
}
