import TradeView from "./trade.view";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { openInvoiceModal } from "@/modules/order/presentation/redux";
import { OrderType } from "@/core/enums/order.enums";
import buyOrderRequest from "@/modules/order/domain/usecases/buyOrderRequest";
import { useErrorHandler, useSelector } from "@/core/hooks";
import sellOrderRequest from "@/modules/order/domain/usecases/sellOrderRequest";
import useAppInitials from "@/modules/_app/domain/usecases/useAppInitials";
import { CoinDataInterface } from "@/modules/coin/domain/entities/coin";
import withMaxDecimal from "@/core/helpers";
import { openBankCardModal } from "@/modules/profile/presentation/redux";
import InvoiceModalComponent from "@/modules/order/presentation/components/invoice-modal";

// const InvoiceModalComponent = dynamic(
//   () => import("@/modules/order/presentation/components/invoice-modal"),
//   { ssr: false }
// );

type PropTypes = {
  scrollable?: boolean;
  coinsFallback?: any;
  selectedCoin?: CoinDataInterface;
};
function getInitialValues(coin?: CoinDataInterface) {
  if (!coin) {
    return { amount: 1, price: 1, coin: "BTC" };
  }

  const amount = coin.sellPrice < 100 ? 1000 : 1;
  const price = amount * coin.buyPrice;
  return {
    amount,
    price: price > 100 ? Math.round(price) : withMaxDecimal(price, 4),
    coin: coin.shortName,
  };
}

export default function TradeComponent(props: PropTypes) {
  const dispatch = useDispatch();
  const formikRef = useRef<any>();
  const { data: appInitials } = useAppInitials();
  const { cachedLogo } = useSelector((s) => s.auth);
  const [isSell, setIsSell] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState<CoinDataInterface>(
    props.selectedCoin!
  );
  const errorHandler = useErrorHandler({
    addNewCardPage: (close) => {
      dispatch(openBankCardModal());
      close();
    },
  });
  const initialValues = useRef(getInitialValues(selectedCoin));

  const revalidatePrice = (value?: number, data?: any) => {
    const coin = data?.coin || selectedCoin;
    const sell = data?.isSell ?? isSell;

    if (!formikRef?.current?.setFieldValue || !coin) return;

    const { values, setFieldValue } = formikRef.current;
    const amount = value !== undefined ? value : values.amount;
    const price =
      amount < 0 ? 0 : amount * (sell ? coin.sellPrice : coin.buyPrice);
    setFieldValue(
      "price",
      price > 100 ? Math.round(price) : withMaxDecimal(price, 4)
    );
  };
  const revalidateAmount = (value: number) => {
    if (!formikRef?.current?.setFieldValue || !selectedCoin) return;
    const { values, setFieldValue } = formikRef.current;
    const price = value !== undefined ? value : values.price;
    const amount =
      price < 0
        ? 0
        : price / (isSell ? selectedCoin.sellPrice : selectedCoin.buyPrice);
    setFieldValue("amount", withMaxDecimal(amount, selectedCoin.decimal));
  };
  const handleCoinChange = (coin: CoinDataInterface) => {
    setSelectedCoin(coin);
    if (!formikRef?.current?.values) return;
    const { values, setFieldValue } = formikRef.current;
    if (values.coin === coin.shortName) return;
    if (coin.sellPrice < 100) {
      setFieldValue("amount", 1000);
      return;
    }
    setFieldValue("amount", 1);
  };
  const handleSell = async (value: any) => {
    const { error, data } = await sellOrderRequest(value);
    if (error) {
      return errorHandler(error);
    }
    dispatch(
      openInvoiceModal({
        ...data,
        initialData: value,
        orderType: isSell ? OrderType.Sell : OrderType.Buy,
      })
    );
  };
  const handleBuy = async (value: any) => {
    const { error, data } = await buyOrderRequest(value);
    if (error) {
      return errorHandler(error);
    }
    dispatch(
      openInvoiceModal({
        ...data,
        initialData: value,
        orderType: isSell ? OrderType.Sell : OrderType.Buy,
      })
    );
  };
  const onSubmit = async (value: any) => {
    if (isSell) return handleSell(value);
    return handleBuy(value);
  };
  const handlePriceChange = (coin: CoinDataInterface) => {
    setSelectedCoin(coin);
    revalidatePrice(undefined, { coin });
  };
  const toggleIsSell = () => {
    setIsSell(!isSell);
    revalidatePrice(undefined, { isSell: !isSell });
  };

  return (
    <>
      <TradeView
        {...{
          cachedLogo,
          isSell,
          onSubmit,
          formikRef,
          handlePriceChange,
          handleCoinChange,
          toggleIsSell,
          revalidatePrice,
          revalidateAmount,
          logo: appInitials?.logo,
          fallbackData: props.coinsFallback,
          initialValues: initialValues.current,
          ...props,
        }}
      />
      <InvoiceModalComponent />
    </>
  );
}
