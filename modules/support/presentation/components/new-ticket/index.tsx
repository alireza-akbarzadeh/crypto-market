import { TicketCategoryInterface } from "@/modules/support/domain/entities/ticket";
import useSupportCategories from "@/modules/support/domain/usecases/useSupportCategories";
import NewTicketView from "./new-ticket.view";

type PropTypes = {
  onSelect: (item: TicketCategoryInterface) => void;
};
export default function NewTicketComponent(props: PropTypes) {
  const { data, isLoading } = useSupportCategories();
  return <NewTicketView {...props} {...{ data, isLoading }} />;
}
