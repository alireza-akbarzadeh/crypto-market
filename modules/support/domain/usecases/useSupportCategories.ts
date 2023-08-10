import { TicketCategoryInterface } from "@/modules/support/domain/entities/ticket";
import { useSupportCategoriesDS } from "../../data/datasources/support.datasource";
import supportCategoryModelMapper from "../../data/model/supportCategory";

export default function useSupportCategories() {
  const { data, error, isValidating } = useSupportCategoriesDS();

  const _data: TicketCategoryInterface[] = data
    ? data.result.items.map(supportCategoryModelMapper)
    : [];

  return {
    data: _data,
    error: data?.error || error,
    isLoading: isValidating && !data,
  };
}
