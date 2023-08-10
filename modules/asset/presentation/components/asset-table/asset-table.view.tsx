import { Typography } from "@mui/material";
import styles from "./asset-table.module.scss";
import AssetCategoryListItemComponent from "../asset-category-list-item";
import InfiniteListComponent, {
  fixedRowBuilder,
} from "@/core/components/common/infinite-list";
import useAssets from "@/modules/asset/domain/usecases/useAssets";
import EmptyContentComponent from "@/core/components/common/empty-content";

type PropTypes = { isDesktopSize: boolean; openAddModal: () => void };
export default function AssetTableView(props: PropTypes) {
  const { isDesktopSize, openAddModal } = props;
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Typography component="div" className={styles.cell}>
          دارایی
        </Typography>
        <Typography component="div" className={styles.cell}>
          مقدار
        </Typography>
        <Typography component="div" className={styles.cell}>
          ارزش به تومان
        </Typography>
        <Typography component="div" className={styles.cell}>
          سود و ضرر
        </Typography>
        <Typography component="div" className={styles.cell}>
          جزئیات
        </Typography>
      </div>
      <InfiniteListComponent
        {...{
          pageSize: 15,
          getHook: useAssets,
          getItemData: (rows) => ({ rows }),
          itemSize: isDesktopSize ? 103 : 152,
          Row,
        }}
      >
        {({ List, isLoading, rows }) => (
          <div className={styles.content}>
            {List}
            {!rows.length && !isLoading && (
              <EmptyContentComponent
                message="دارایی خود را وارد نکرده اید."
                buttonProps={{
                  onClick: openAddModal,
                  label: "افزودن دارایی جدید",
                }}
              />
            )}
          </div>
        )}
      </InfiniteListComponent>
    </div>
  );
}

const Row = fixedRowBuilder(({ index, style, data }) => {
  const { rows } = data;
  return (
    <div style={style}>
      <AssetCategoryListItemComponent isFirst={!index} data={rows[index]} />
    </div>
  );
});
