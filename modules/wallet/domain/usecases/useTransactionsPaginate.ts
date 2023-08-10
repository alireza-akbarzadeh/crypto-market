import transactionModelMapper from "@/modules/wallet/data/model/transaction";
import { GetPaginateHookType } from "@/core/hooks/usePaginateHelpers";
import { TransactionInterface } from "@/modules/wallet/domain/entities/transaction";
import { useTransactionsPaginateDS } from "../../data/datasources/wallet.datasource";

const useTransactionsPaginate: GetPaginateHookType<TransactionInterface> =
  () => {
    const { rows, meta, setSize, size, isLoading, mutate } =
      useTransactionsPaginateDS<TransactionInterface>(
        transactionModelMapper,
        5
      );

    return {
      rows,
      meta,
      size,
      setSize,
      isLoading,
      mutate,
    };
  };

export default useTransactionsPaginate;
