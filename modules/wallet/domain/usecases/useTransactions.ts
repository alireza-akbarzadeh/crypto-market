import transactionModelMapper from "@/modules/wallet/data/model/transaction";
import { GetPaginateHookType } from "@/core/hooks/usePaginateHelpers";
import { TransactionInterface } from "@/modules/wallet/domain/entities/transaction";
import { useTransactionsDS } from "../../data/datasources/wallet.datasource";

const useTransactions: GetPaginateHookType<TransactionInterface> = () => {
  const { rows, meta, setSize, size, isLoading, mutate } =
    useTransactionsDS<TransactionInterface>(transactionModelMapper);

  return {
    rows,
    meta,
    size,
    setSize,
    isLoading,
    mutate,
  };
};

export default useTransactions;
