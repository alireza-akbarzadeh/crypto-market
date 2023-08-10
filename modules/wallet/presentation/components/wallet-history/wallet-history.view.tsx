import styles from "./wallet-history.module.scss";
import WalletHistoryCardComponent from "../wallet-history-card";
import WalletHistoryDetailsComponent from "../wallet-history-details";
import { TransactionInterface } from "@/modules/wallet/domain/entities/transaction";
import PaginationListComponent from "@/core/components/common/pagination-list";
import useTransactions from "@/modules/wallet/domain/usecases/useTransactions";
import LoadingComponent from "@/core/components/common/loading";
import InfiniteListComponent, {
  fixedRowBuilder,
} from "@/core/components/common/infinite-list";
import useTransactionsPaginate from "@/modules/wallet/domain/usecases/useTransactionsPaginate";
import EmptyContentComponent from "@/core/components/common/empty-content";

type PropTypes = {
  closeDetails: () => void;
  details?: TransactionInterface;
  detailsOpen: boolean;
  isDesktopSize: boolean;
  handleOpen: (data: TransactionInterface) => void;
};
export default function WalletHistoryView(props: PropTypes) {
  const { closeDetails, details, detailsOpen, handleOpen, isDesktopSize } =
    props;

  const emptyContent = () => (
    <EmptyContentComponent message="هیچ تراکنشی یافت نشد." />
  );
  return (
    <div className={styles.root}>
      {isDesktopSize ? (
        <PaginationListComponent getHook={useTransactionsPaginate} pageSize={5}>
          {({ rows, isLoading, Pagination }) => (
            <>
              {rows.map((data, idx) => (
                <WalletHistoryCardComponent
                  key={data?.id || idx}
                  onClick={() => handleOpen(data)}
                  {...{ data, isDesktopSize }}
                />
              ))}
              <LoadingComponent loading={isLoading} />
              {!isLoading && !rows.length && emptyContent()}
              {Pagination}
            </>
          )}
        </PaginationListComponent>
      ) : (
        <InfiniteListComponent
          {...{
            pageSize: 5,
            getHook: useTransactions,
            getItemData: (rows) => ({ rows, isDesktopSize, handleOpen }),
            itemSize: 78,
            Row,
          }}
        >
          {({ List, rows, isLoading }) => (
            <>
              {List}
              {!isLoading && !rows.length && emptyContent()}
              <LoadingComponent loading={isLoading} />
            </>
          )}
        </InfiniteListComponent>
      )}
      <WalletHistoryDetailsComponent
        open={detailsOpen}
        onClose={closeDetails}
        data={details}
      />
    </div>
  );
}

const Row = fixedRowBuilder(({ index, style, data }) => {
  const { rows, isDesktopSize, handleOpen } = data;
  return (
    <div style={style}>
      <WalletHistoryCardComponent
        onClick={() => handleOpen(rows[index])}
        data={rows[index]}
        isDesktopSize={isDesktopSize}
        isFirst={!index}
      />
    </div>
  );
});
