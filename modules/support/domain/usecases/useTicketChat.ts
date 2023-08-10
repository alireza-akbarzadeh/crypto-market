import { useTicketChatDS } from "../../data/datasources/support.datasource";
import ticketChatItemModelMapper from "../../data/model/ticketChatItem";

export default function useTicketChat({ id }: any) {
  const { rows, meta, error, mutate, setSize, size, isLoading } =
    useTicketChatDS(id, ticketChatItemModelMapper);
  return { rows, meta, size, setSize, isLoading, mutate };
}
