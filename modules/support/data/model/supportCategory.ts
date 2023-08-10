import { TicketCategoryInterface } from "@/modules/support/domain/entities/ticket";

export default function supportCategoryModelMapper(
  data: any
): TicketCategoryInterface {
  const { id, title, description, orderRequired } = data;
  return { id, title, description, orderRequired };
}
