import styles from "./trade.module.scss";
import TradeComponent from "../../components/trade";
import AppHeaderComponent from "@/core/components/layouts/app-header";
import SupportButtonComponent from "@/modules/_app/presentation/components/support-button";
import { CoinDataInterface } from "@/modules/coin/domain/entities/coin";

type PropTypes = {
  coinsFallback: any;
  selectedCoin?: CoinDataInterface;
};
export default function TradeView(props: PropTypes) {
  return (
    <div className={styles.root}>
      <AppHeaderComponent
        className={styles.header}
        // toolbarContent={<SupportButtonComponent sx={{ ml: "auto" }} />}
        skipHolder
        backHref="/"
      />
      <TradeComponent {...props} />
    </div>
  );
}
