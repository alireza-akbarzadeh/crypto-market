import { useTicketsDS } from "../../data/datasources/support.datasource";
import ticketModelMapper from "../../data/model/ticket";

export default function useTickets(params: any, fetchOnMount = true) {
  const { rows, meta, error, mutate, setSize, size, isLoading } = useTicketsDS(
    ticketModelMapper,
    fetchOnMount
  );
  return { rows, meta, size, setSize, isLoading, mutate };
}
