import AppDialogComponent from "@/core/components/common/app-dialog";
import { Avatar, ButtonBase } from "@mui/material";
import Image from "next/image";
import styles from "./avatar-modal.module.scss";
import {
  FixedSizeGrid,
  GridOnItemsRenderedProps,
  ListOnItemsRenderedProps,
} from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { ProfileAvatar } from "@/modules/profile/domain/entities/avatar";
import InfiniteLoader from "react-window-infinite-loader";
import clsx from "clsx";

type PropTypes = {
  open: boolean;
  onClose: () => void;
  data: ProfileAvatar[];
  itemCount: number;
  isLoading: boolean;
  handleItemLoaded: (idx: number) => boolean;
  handleLoadMore: (start: number) => void;
  columnCount: number;
  handleItemsRendered: (
    fn: (props: ListOnItemsRenderedProps) => any
  ) => (props: GridOnItemsRenderedProps) => any;
  isMobileSize: boolean;
  selectedId?: string;
  onSelect: (id: string) => void;
};

export default function AvatarModalView(props: PropTypes) {
  const {
    open,
    onClose,
    data,
    itemCount,
    isLoading,
    handleItemLoaded,
    handleLoadMore,
    columnCount,
    handleItemsRendered,
    isMobileSize,
    selectedId,
    onSelect,
  } = props;

  const padding = isMobileSize ? 16 : 50;

  return (
    <AppDialogComponent
      classes={{ paper: styles.paper }}
      contentClassName={styles.content}
      closeOnOutside={false}
      className={styles.root}
      open={open}
      onClose={onClose}
      title="انتخاب آواتار"
      mobileStyle={2}
    >
      <AutoSizer>
        {({ height, width }) => {
          const cellSize = (width - padding * 2) / columnCount;
          return (
            <InfiniteLoader
              isItemLoaded={handleItemLoaded}
              itemCount={itemCount}
              loadMoreItems={handleLoadMore}
              // threshold={threshold}
            >
              {({ ref, onItemsRendered }) => (
                <FixedSizeGrid
                  ref={ref}
                  onItemsRendered={handleItemsRendered(onItemsRendered)}
                  rowCount={Math.ceil(itemCount / 4)}
                  columnCount={columnCount}
                  columnWidth={cellSize}
                  rowHeight={cellSize}
                  height={height}
                  width={width - padding}
                  className={styles.gridContainer}
                  itemData={{ data, isLoading, selectedId, onSelect }}
                >
                  {Cell}
                </FixedSizeGrid>
              )}
            </InfiniteLoader>
          );
        }}
      </AutoSizer>
    </AppDialogComponent>
  );
}
const Cell = ({ columnIndex, rowIndex, style, data }: any) => {
  const itemData = data.data[rowIndex * 4 + columnIndex];

  if (!itemData && !data.isLoading) return null;
  return (
    <div className={styles.avatarItem} style={style}>
      <ButtonBase
        onClick={() => data.onSelect(itemData?.id)}
        className={clsx({
          [styles.avatarWrapper]: true,
          [styles.selected]: data.selectedId === itemData?.id,
        })}
      >
        <Avatar className={styles.avatar}>
          {itemData ? (
            <Image src={itemData.avatar} width={55} height={55} />
          ) : null}
        </Avatar>
      </ButtonBase>
    </div>
  );
};
