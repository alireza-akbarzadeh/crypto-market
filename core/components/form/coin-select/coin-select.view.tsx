import { CoinDataInterface } from "@/modules/coin/domain/entities/coin";
import {
  Dialog,
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
  Toolbar,
  Typography,
} from "@mui/material";
import clsx from "clsx";
import { SearchIcon } from "@/core/components/common/custom-icon";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./coin-select.module.scss";
import { forwardRef, memo, useMemo } from "react";
import FakeInputComponent from "./fake-input";
import InfiniteLoader from "react-window-infinite-loader";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList, areEqual } from "react-window";
import CoinListItemComponent from "./coin-list-item";
import SlideUp from "../../common/slide-up";
import { useIsMobileSize } from "@/core/hooks";
import EmptyContentComponent from "../../common/empty-content";

type PropTypes = {
  label?: string;
  value?: string;
  onChange?: (id: string) => void;
  isSell?: boolean;
  handleOpen: () => void;
  handleSelect: (coin: CoinDataInterface) => void;
  isOpen: boolean;
  onClose: () => void;
  selected?: CoinDataInterface;
  handleItemLoaded: (index: number) => boolean;
  handleLoadMore: (start: number, stop: number) => void;
  rows: CoinDataInterface[];
  itemCount: number;
  inputValue: string;
  handleInputValueChange: (e: any) => void;
  skipInput?: boolean;
  skipPrice?: boolean;
  selecting?: string;
  isLoading: boolean;
} & TextFieldProps;

export default function CoinSelectView(props: PropTypes) {
  const {
    className,
    label,
    value,
    handleOpen,
    isOpen,
    onClose,
    handleSelect,
    selected,
    isSell,
    inputValue,
    handleInputValueChange,
    handleItemLoaded,
    handleLoadMore,
    rows,
    itemCount,
    skipInput,
    skipPrice,
    selecting,
    isLoading,
    ...other
  } = props;
  const isMobileSize = useIsMobileSize();

  const FakeInput = useMemo(() => {
    return forwardRef<any, any>((props, inputRef) => (
      <FakeInputComponent {...props} {...{ inputRef, coin: selected }} />
    ));
  }, [selected]);

  return (
    <>
      {!skipInput && (
        <TextField
          className={clsx(styles.fakeInputWrapper, className)}
          label={label || "انتخاب ارز"}
          InputLabelProps={{ shrink: true }}
          InputProps={{ inputComponent: FakeInput }}
          onClick={handleOpen}
          fullWidth
          size="small"
          margin="normal"
          value={value}
          {...other}
        />
      )}
      <Dialog
        fullScreen={isMobileSize}
        TransitionComponent={isMobileSize ? SlideUp : undefined}
        fullWidth
        open={isOpen}
        onClose={onClose}
        maxWidth="sm"
        PaperProps={{
          className: styles.root,
        }}
      >
        <Toolbar className={styles.toolbar}>
          <Typography className={styles.title} fontWeight={500} variant="h6">
            انتخاب ارز
          </Typography>
          <TextField
            className={styles.input}
            placeholder="جستجو"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            value={inputValue}
            onChange={handleInputValueChange}
          />
          <IconButton color="inherit" onClick={onClose} edge="end">
            <CloseIcon />
          </IconButton>
        </Toolbar>
        <div className={styles.listContainer}>
          {!isLoading && !rows.length && (
            <div className={styles.emptyContainer}>
              <EmptyContentComponent small message="چیزی یافت نشد." />
            </div>
          )}
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
                    itemSize={isMobileSize ? 60 : skipPrice ? 73 : 93}
                    itemData={{
                      rows,
                      handleSelect,
                      selected,
                      isSell,
                      skipPrice,
                      selecting,
                    }}
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
        </div>
      </Dialog>
    </>
  );
}

const Row = memo(({ index, style, data }: any) => {
  const { rows, handleSelect, selected, isSell, skipPrice, selecting } = data;
  return (
    <CoinListItemComponent
      {...{
        style,
        coin: rows[index],
        handleSelect,
        selected,
        isSell,
        skipPrice,
        selecting,
      }}
    />
  );
}, areEqual);
