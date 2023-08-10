import { usePaginateHelpers } from "@/core/hooks";
import { TicketInterface } from "@/modules/support/domain/entities/ticket";
import useTickets from "@/modules/support/domain/usecases/useTickets";
import { useState } from "react";
import MyTicketsView from "./my-tickets.view";

type PropTypes = { onSelect: () => void; open: boolean };
export default function MyTicketsComponent(props: PropTypes) {
  const { open, onSelect } = props;
  const [selectedTicket, setSelectedTicket] = useState<TicketInterface>();
  const { handleItemLoaded, fakeItemCount, handleLoadMore, isLoading, rows } =
    usePaginateHelpers(useTickets, 20);
  const handleSelect = (item: TicketInterface) => {
    setSelectedTicket(item);
    onSelect();
  };

  return (
    <MyTicketsView
      {...{
        open,
        handleSelect,
        handleItemLoaded,
        itemCount: fakeItemCount,
        handleLoadMore,
        rows,
        selectedTicket,
        isLoading,
      }}
    />
  );
}
