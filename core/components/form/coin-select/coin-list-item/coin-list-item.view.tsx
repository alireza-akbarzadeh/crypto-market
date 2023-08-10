import { currencyFormat } from "@/core/helpers";
import { CoinDataInterface } from "@/modules/coin/domain/entities/coin";
import { ListItem, Grid, ListItemButton, Typography } from "@mui/material";
import styles from "./coin-list-item.module.scss";
import Image from "next/image";
import clsx from "clsx";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";

type PropTypes = {
  handleSelect: (coin: CoinDataInterface) => void;
  coin: CoinDataInterface;
  isSell: boolean;
  isSelected: boolean;
  skipPrice?: boolean;
  style: any;
  selecting?: string;
};
export default function CoinListItemView(props: PropTypes) {
  const {
    handleSelect,
    coin,
    isSell,
    isSelected,
    style,
    skipPrice,
    selecting,
  } = props;

  if (!coin) return <div style={style}></div>;
  return (
    <div style={style} className={styles.wrapper}>
      <ListItem component="div" disablePadding className={styles.listItem}>
        <ListItemButton
          className={styles.clickable}
          onClick={!selecting ? () => handleSelect(coin) : undefined}
          selected={isSelected}
          disabled={Boolean(selecting && selecting !== coin.shortName)}
        >
          <Grid className={styles.coin} container flexWrap="nowrap">
            <Grid
              item
              xs={skipPrice ? 12 : 7}
              className={clsx({
                [styles.coinProps]: true,
                [styles.skipPrice]: skipPrice,
              })}
            >
              <div className={styles.coinIcon}>
                <Image
                  src={coin.icon}
                  alt={coin.shortName}
                  width={40}
                  height={40}
                />
              </div>
              <div className={styles.coinName}>
                <Typography component="div">{coin.faName}</Typography>
                <Typography
                  component="div"
                  variant="body2"
                  color="text.secondary"
                >
                  {coin.shortName} - {coin.enName}
                </Typography>
              </div>
            </Grid>
            {!skipPrice && (
              <Grid item xs={5}>
                <Typography variant="body2" component="div">
                  {isSell ? "قیمت فروش" : "قیمت خرید"}
                </Typography>
                <Typography component="div">
                  {currencyFormat(isSell ? coin.sellPrice : coin.buyPrice)}{" "}
                  <Typography
                    component="span"
                    variant="caption"
                    color="text.secondary"
                  >
                    تومان
                  </Typography>
                </Typography>
              </Grid>
            )}
            {selecting ? (
              selecting === coin.shortName ? (
                <HourglassTopIcon />
              ) : null
            ) : (
              isSelected && <CheckCircleIcon color="primary" />
            )}
          </Grid>
        </ListItemButton>
      </ListItem>
    </div>
  );
}
