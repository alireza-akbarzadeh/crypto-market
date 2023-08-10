import { Typography } from "@mui/material";
import TicketListItemComponent from "../ticket-list-item";
import styles from "./my-tickets.module.scss";
import InfiniteLoader from "react-window-infinite-loader";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList } from "react-window";
import { fixedRowBuilder } from "@/core/components/common/infinite-list";
import { TicketInterface } from "@/modules/support/domain/entities/ticket";
import TicketChatModalComponent from "../ticket-chat-modal";
import EmptyContentComponent from "@/core/components/common/empty-content";

type PropTypes = {
  handleSelect: (item: TicketInterface) => void;
  open: boolean;
  handleItemLoaded: (index: number) => boolean;
  itemCount: number;
  handleLoadMore: (start: number) => void;
  rows: TicketInterface[];
  selectedTicket?: TicketInterface;
  isLoading: boolean;
};
export default function MyTicketsView(props: PropTypes) {
  const {
    handleSelect,
    open,
    selectedTicket,
    handleItemLoaded,
    itemCount,
    handleLoadMore,
    rows,
    isLoading,
  } = props;
  return (
    <div className={styles.listPage}>
      <div className={styles.header}>
        <Typography component="h3" variant="h6" fontWeight={500} sx={{ mb: 1 }}>
          تیکت های من
        </Typography>
        <Typography sx={{ mb: 2 }}>
          در این بخش وضعیت تیکت های ثبت شده خود را میتوانید مشاهده کنید.
        </Typography>
      </div>
      <div className={styles.content}>
        {!isLoading && !rows.length ? (
          <EmptyContentComponent message="تیکتی یافت نشد." />
        ) : (
          <AutoSizer>
            {({ height, width }) => (
              <InfiniteLoader
                isItemLoaded={handleItemLoaded}
                itemCount={itemCount}
                loadMoreItems={handleLoadMore}
              >
                {({ onItemsRendered, ref }) => (
                  <FixedSizeList
                    direction="rtl"
                    ref={ref}
                    itemCount={itemCount}
                    itemSize={88}
                    itemData={{ rows, handleSelect }}
                    onItemsRendered={onItemsRendered}
                    height={height}
                    width={width}
                    style={{ paddingBottom: 70 }}
                  >
                    {Row}
                  </FixedSizeList>
                )}
              </InfiniteLoader>
            )}
          </AutoSizer>
        )}
      </div>

      <TicketChatModalComponent open={open} ticketId={selectedTicket?.id} />
    </div>
  );
}

const Row = fixedRowBuilder(({ index, style, data }) => {
  const { rows, handleSelect } = data;
  const _data = rows[index];

  return (
    <div style={style}>
      <TicketListItemComponent
        data={_data}
        onClick={() => handleSelect(_data)}
      />
    </div>
  );
});
