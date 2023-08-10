import styles from "./live-price.module.scss";
import {
  Container,
  TextField,
  InputAdornment,
  Typography,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
  Menu,
  MenuItem,
  IconButton,
  ListItem,
  List,
  ListItemButton,
} from "@mui/material";
import {
  SearchIcon,
  StarOutlineIcon,
} from "@/core/components/common/custom-icon";
import CoinTableComponent from "../../components/coin-table";
import ToggleButtonComponent from "@/core/components/form/toggle-button";
import { currencyFormat } from "@/core/helpers";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import clsx from "clsx";
import CloseIcon from "@mui/icons-material/Close";
import SortIcon from "@mui/icons-material/Tune";
import AppDialogComponent from "@/core/components/common/app-dialog";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { LivePriceSortOption } from "@/modules/_app/domain/entities/appInitials";
import AppHeaderComponent from "@/core/components/layouts/app-header";
import { Notification_2LineIcon } from "@/core/components/common/remixicons";
import Link from "next/link";

type PropTypes = {
  handleInputChange: (e: any) => void;
  inputValue: string;
  searchText: string;
  mode: string;
  setMode: (mode: string) => void;
  fallbackData: any;
  showFavorites: boolean;
  toggleShowFavorites: () => void;
  sortChange: (sort?: LivePriceSortOption) => void;
  sort?: LivePriceSortOption;
  count?: number;
  setCount: (c: number) => void;
  sortAnchorEl: any;
  sortOpen: boolean;
  setSortOpen: (open: boolean) => void;
  sortOptions: LivePriceSortOption[];
};
export default function LivePriceView(props: PropTypes) {
  const {
    handleInputChange,
    inputValue,
    searchText,
    mode,
    setMode,
    showFavorites,
    toggleShowFavorites,
    count,
    setCount,
    sortChange,
    sort,
    sortAnchorEl,
    sortOpen,
    setSortOpen,
    sortOptions,
    fallbackData,
  } = props;

  return (
    <div className={styles.root}>
      {/* <AppHeader className={styles.appHeader} /> */}
      <AppHeaderComponent
        className={styles.appHeader}
        title="قیمت لحظه‌ای"
        backHref="/"
        // toolbarContent={
        //   <Link href="/price-alert" passHref>
        //     <IconButton component="a" sx={{ ml: "auto" }}>
        //       <Notification_2LineIcon />
        //     </IconButton>
        //   </Link>
        // }
      />
      <Container className={styles.container}>
        <div className={styles.paper}>
          <div className={styles.header}>
            <Typography
              className={styles.title}
              component="h2"
              variant="h4"
              fontWeight={700}
            >
              قیمت لحظه‌ای
            </Typography>
            {Boolean(count) && (
              <Typography color="text.secondary">
                <span className="online-dot warning" />
                {currencyFormat(count)} ارز دیجیتال
              </Typography>
            )}
          </div>

          <Grid className={styles.filters} container spacing={{ xs: 1, md: 3 }}>
            <Grid item xs={12} md={4}>
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
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment
                      className={styles.sortButtonWrapper}
                      position="end"
                    >
                      <IconButton onClick={() => setSortOpen(true)}>
                        <SortIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                placeholder="جستجو"
                value={inputValue}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item container spacing={1.5} xs="auto" sm={6} md={4}>
              <Grid item xs="auto" sm={6}>
                <ToggleButtonComponent
                  className={styles.button}
                  selected={showFavorites}
                  onClick={toggleShowFavorites}
                  fullWidth
                  variant="containedLight"
                  startIcon={<StarOutlineIcon className="font-size-body1" />}
                  size="small"
                >
                  <span>نشان شده‌ها</span>
                </ToggleButtonComponent>
              </Grid>
              <Grid className="mobile-up" item xs="auto" sm={6}>
                <TextField
                  ref={sortAnchorEl}
                  value={sort ? sort.title : ""}
                  onClick={() => setSortOpen(true)}
                  sx={{
                    "& fieldset": {
                      borderColor: "divider",
                    },
                  }}
                  className={clsx(styles.searchInput, "pointer")}
                  label="ترتیب بر اساس"
                  inputProps={{ disabled: true }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {sort ? (
                          <CloseIcon
                            onClick={(e) => {
                              e.stopPropagation();
                              sortChange();
                            }}
                          />
                        ) : (
                          <ExpandMoreIcon />
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
                <Menu
                  className="mobile-up"
                  anchorEl={sortAnchorEl.current}
                  open={sortOpen}
                  onClose={() => setSortOpen(false)}
                >
                  {sortOptions.map((s) => (
                    <MenuItem
                      key={s.id}
                      onClick={() => sortChange(s)}
                      selected={sort?.id === s.id}
                    >
                      {s.title}
                    </MenuItem>
                  ))}
                </Menu>
              </Grid>
            </Grid>
            <Grid className={styles.groupWrapper} item xs md={4}>
              <ToggleButtonComponent
                className={clsx(styles.button, "mobile-down")}
                onClick={() => setMode(mode === "tether" ? "toman" : "tether")}
                variant="containedLight"
                size="small"
              >
                <span>قیمت بر اساس {mode === "toman" ? "تتر" : "تومان"}</span>
              </ToggleButtonComponent>

              <ToggleButtonGroup
                className={clsx(styles.group, "mobile-up")}
                color="standard"
                fullWidth
                value={mode}
                exclusive
                onChange={(_, val) => setMode(val !== null ? val : mode)}
                size="small"
              >
                <ToggleButton className={styles.btn} value={"toman"}>
                  تومان
                </ToggleButton>
                <ToggleButton className={styles.btn} value={"tether"}>
                  تتر
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          </Grid>
          <div className={styles.tableWrapper}>
            <CoinTableComponent
              {...{
                searchText,
                mode,
                setCount,
                showFavorites,
                sort: sort?.id,
                fallbackData,
              }}
            />
          </div>
        </div>
      </Container>
      <AppDialogComponent
        open={sortOpen}
        onClose={() => setSortOpen(false)}
        mobileStyle={4}
        className={styles.sortModal}
        contentClassName={styles.container}
        headerClassName="d-none"
      >
        <List>
          {sortOptions.map((s, idx) => (
            <ListItem
              disablePadding
              key={s.id}
              divider={idx < sortOptions.length - 1}
              secondaryAction={
                sort?.id === s.id ? (
                  <IconButton edge="end">
                    <CheckCircleIcon color="primary" />
                  </IconButton>
                ) : null
              }
            >
              <ListItemButton
                className={styles.listItemButton}
                onClick={() => sortChange(sort?.id === s.id ? undefined : s)}
              >
                <Typography className={styles.primary}>{s.title}</Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </AppDialogComponent>
    </div>
  );
}
