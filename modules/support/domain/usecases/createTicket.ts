import { toFormData } from "@/core/helpers";
import { createTicketDS } from "../../data/datasources/support.datasource";
import { TicketFormValues } from "./../entities/ticket";
export default async function createTicket(values: TicketFormValues) {
  const { result, message, error } = await createTicketDS(
    toFormData({
      description: values.description,
      support_category_id: values.categoryId,
      order_id: values.orderId,
      parent_id: values.parentId,
      file: values.file,
    })
  );
  if (error) {
    return { error };
  }
  return { data: result, message };
}
