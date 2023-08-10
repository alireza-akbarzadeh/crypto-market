import { TicketStatus } from "@/core/enums/ticket.enums";
export interface TicketCategoryInterface {
  title: string;
  description: string;
  id: string;
  orderRequired?: boolean;
}
export interface TicketFormValues {
  description: string;
  categoryId?: string;
  parentId?: string;
  orderId?: string;
  file?: File;
}
export interface TicketInterface {
  id: string;
  categoryTitle: string;
  status: TicketStatus;
  ticketNumber: number;
  createdAt: string;
}
export interface TicketChatItemInterface {
  id: string;
  message: string;
  attachment?: string;
  owner: boolean;
  date?: string;
  day?: string;

  // id: 395234;
  // description: "BugReport";
  // attachment: "https://api.crypto.dev/api/v1/support/getSupportTicket/attach/395234";
  // owner: true;
  // createdAt
}
