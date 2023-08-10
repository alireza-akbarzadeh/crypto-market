import { PaginateHelperType } from "@/core/constants/types";
import { Pagination } from "@mui/material";
import styles from "./pagination-list.module.scss";

type PropTypes = {
  paginateHelper?: PaginateHelperType;
  isLoading: boolean;
  isDesktopSize: boolean;
  handleChange: (e: any, page: number) => void;
};
export default function PaginationListView(props: PropTypes) {
  const { paginateHelper, isLoading, isDesktopSize, handleChange } = props;
  if (!paginateHelper || paginateHelper.lastPage === 1) return null;
  return (
    <div className={styles.root}>
      <Pagination
        disabled={isLoading}
        count={paginateHelper.lastPage}
        page={paginateHelper.currentPage || 1}
        onChange={handleChange}
        size={
          isDesktopSize || paginateHelper.lastPage <= 5 ? "medium" : "small"
        }
      />
    </div>
  );
}
