import type { NextPage } from "next";
import TradePage, {
  getStaticProps,
} from "@/modules/home/presentation/pages/trade";

const Trade: NextPage = (props: any) => {
  return <TradePage {...props} />;
};

export default Trade;
export { getStaticProps };
