import { SearchIcon } from "@/core/components/common/custom-icon";
import EmptyContentComponent from "@/core/components/common/empty-content";
import InfiniteListComponent, {
  fixedRowBuilder,
} from "@/core/components/common/infinite-list";
import AppHeaderComponent from "@/core/components/layouts/app-header";

import useFees from "@/modules/coin/domain/usecases/useFees";
import {
  Container,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import FeeCardComponent from "../../components/fee-card";
import styles from "./fee.module.scss";

type PropTypes = { isDesktopSize: boolean };
export default function FeeView(props: PropTypes) {
  const { isDesktopSize } = props;
  return (
    <div className={styles.root}>
      {/* <AppHeaderComponent className={styles.header} /> */}
      <AppHeaderComponent
        className={styles.header}
        title="کارمزدها"
        backHref="/profile"
      />
      <InfiniteListComponent
        {...{
          pageSize: 20,
          getHook: useFees,
          getItemData: (rows) => ({ rows }),
          itemSize: isDesktopSize ? 112 : 205,
          Row,
        }}
      >
        {({ List, inputValue, setInputValue, isLoading, rows }) => (
          <Container className={styles.mainContainer}>
            <Typography
              className={styles.title}
              fontWeight={700}
              variant="h5"
              component="h2"
            >
              کارمزدها
            </Typography>
            <div className={styles.headSection}>
              <TextField
                sx={{
                  "& fieldset": {
                    borderColor: "divider",
                  },
                }}
                className={styles.searchInput}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                placeholder="جستجو"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Typography className={styles.note}>
                کارمزد شبکه برای فروش رایگان است
              </Typography>
            </div>
            <Typography className={styles.description}>
              کارمزدهای خرید همان کارمزد شبکه می باشد، که توسط شبکه تعیین می شود
              و از کیف پول شما کسر می گردد وهمچنین کریپو هیچ منفعتی در این امر
              ندارد.
              <br />
              لازم به ذکر است مرجع تعیین قیمت کارمزدها صرافی بین المللی بایننس
              است.
            </Typography>
            {!isLoading && !rows.length && (
              <EmptyContentComponent
                className={styles.empty}
                message="موردی یافت نشد."
              />
            )}
            {List}
          </Container>
        )}
      </InfiniteListComponent>
    </div>
  );
}

const Row = fixedRowBuilder(({ index, style, data }) => {
  const { rows } = data;
  return (
    <div style={style}>
      <FeeCardComponent data={rows[index]} />
    </div>
  );
});
