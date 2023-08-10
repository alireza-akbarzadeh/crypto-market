import {
  Button,
  ButtonBase,
  Container,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import styles from "./live-price-minimal.module.scss";
import { currencyFormat } from "@/core/helpers";
import ArrowRightIcon from "@mui/icons-material/ArrowRightRounded";
import ArrowUpIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDownIcon from "@mui/icons-material/ArrowDropDownRounded";
import Link from "next/link";
import clsx from "clsx";
import { HomeDataInterface } from "@/modules/home/domain/entities/home";
import { LivePriceHomeIcon } from "@/core/components/common/custom-icon";

type PropTypes = {
  sort: number;
  handleSortChange: (val: number) => void;
  data: HomeDataInterface["currencies"];
};
export default function LivePriceMinimalView(props: PropTypes) {
  const { sort, handleSortChange, data } = props;

  return (
    <div className={styles.root}>
      <Container>
        <div className={styles.paper}>
          <div className={styles.header}>
            <LivePriceHomeIcon color="success" className={styles.icon} />
            <div>
              <Typography className={styles.title} component="h2">
                قیمت لحظه‌ای
              </Typography>
              <Typography className={styles.subtitle}>
                در ۲۴ ساعت گذشته
              </Typography>
            </div>
            <Link href="/live-price" passHref>
              <Button component="a">نمایش همه</Button>
            </Link>
          </div>
          <div className={styles.filterSection}>
            <ToggleButtonGroup
              color="standard"
              fullWidth
              value={sort}
              exclusive
              onChange={(_, val) => handleSortChange(val ?? sort)}
              size="small"
              className={styles.sort}
              // sx={{ border: "none" }}
            >
              {data.collections.map((c, i) => (
                <ToggleButton key={i} value={i}>
                  <img src={c.icon} />
                  {c.title}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </div>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              <Typography component="div" className={styles.cell}>
                ارز دیجیتال
              </Typography>
              <Typography component="div" className={styles.cell}>
                قیمت خرید
              </Typography>
              <Typography component="div" className={styles.cell}>
                قیمت فروش
              </Typography>
              <Typography component="div" className={styles.cell}>
                تغییرات
              </Typography>
            </div>
            <div className={styles.body}>
              {data.collections[sort].items.map((coin) => {
                const dump = coin.changes < 0;
                const pump = coin.changes > 0;
                const changes = (
                  <Typography
                    component="div"
                    className={clsx({
                      [styles.changes]: true,
                      [styles.pump]: pump,
                      [styles.dump]: dump,
                    })}
                  >
                    {!coin.changes && (
                      <ArrowRightIcon className={styles.icon} />
                    )}
                    {pump && <ArrowUpIcon className={styles.icon} />}
                    {dump && <ArrowDownIcon className={styles.icon} />}
                    <span>{Math.abs(coin.changes)}٪</span>
                  </Typography>
                );
                return (
                  <ButtonBase
                    key={coin.id}
                    component="a"
                    href={`/${coin.enName.toLowerCase().replace(/\s/g, "-")}`}
                    // href={`/trade/${coin.shortName}`}
                    className={styles.listItemWrapper}
                  >
                    <div className={styles.listItem}>
                      <div className={styles.coin}>
                        <img
                          className={styles.icon}
                          src={coin.icon}
                          alt={coin.shortName}
                        />
                        <div className={styles.info}>
                          <Typography className={styles.title} component="div">
                            {coin.faName}
                          </Typography>
                          <Typography
                            className={styles.subtitle}
                            component="div"
                          >
                            {coin.shortName}
                          </Typography>
                        </div>
                        {changes}
                      </div>
                      <Typography
                        component="div"
                        className={clsx(styles.price, styles.border)}
                      >
                        <span className="desktop-down">خرید</span>
                        {currencyFormat(coin.buyPrice)}
                        <span> تومان</span>
                      </Typography>
                      <Typography component="div" className={styles.price}>
                        <span className="desktop-down">فروش</span>
                        {currencyFormat(coin.sellPrice)}
                        <span> تومان</span>
                      </Typography>
                      {changes}
                    </div>
                  </ButtonBase>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
