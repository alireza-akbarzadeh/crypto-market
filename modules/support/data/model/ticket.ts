import { TicketStatus } from "@/core/enums/ticket.enums";
import { TicketInterface } from "../../domain/entities/ticket";

function statusMapper(status: "pending" | "done") {
  switch (status) {
    case "pending":
      return TicketStatus.Pending;
    case "done":
      return TicketStatus.Done;
    default:
      return TicketStatus.Pending;
  }
}
export default function ticketModelMapper(data: any): TicketInterface {
  const { id, categoryTitle, status, ticketNumber, createdAt } = data;
  return {
    id: `${id}`,
    categoryTitle,
    status: statusMapper(status),
    ticketNumber,
    createdAt,
  };
}
