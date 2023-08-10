import { usePaginateHelpers } from "@/core/hooks";
import { SimpleOrderInterface } from "@/modules/support/domain/entities/order";
import useLatestOrders from "@/modules/support/domain/usecases/useLatestOrders";
import OrderSelectView from "./order-select.view";

type PropTypes = {
  open: boolean;
  onSelect: (order: SimpleOrderInterface) => void;
};
export default function OrderSelectComponent(props: PropTypes) {
  const { open, onSelect } = props;
  const { rows, meta, setSize, isLoading } = usePaginateHelpers(
    useLatestOrders,
    20
  );
  const handleScroll = (e: any) => {
    const { scrollHeight, scrollTop, offsetHeight } = e.target;
    const scrollBottom = scrollHeight - (scrollTop + offsetHeight);
    if (isLoading || scrollBottom > 60 || !meta) return;

    const { currentPage, lastPage } = meta.paginateHelper;
    if (currentPage >= lastPage) return;

    setSize(currentPage + 1);
  };

  return <OrderSelectView {...{ open, onSelect, handleScroll, rows }} />;
}
