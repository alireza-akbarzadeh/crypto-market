import styles from "./purchase.module.scss";
import { useMemo } from "react";
import {
  HomeIcon,
  PaymentIcon,
  ReceiptFilledIcon,
  ReceiptOutlinedIcon,
  RulesIcon,
  WalletFilledIcon,
  WalletOutlinedIcon,
} from "@/core/components/common/custom-icon";
import { Box, Container } from "@mui/material";
import OrderStepperComponent from "../../components/order-stepper";
import PurchasingRulesComponent from "../../components/purchasing-rules";
import PurchasingAddressComponent from "../../components/purchasing-address";
import PurchasingInvoiceComponent from "../../components/purchasing-invoice";
import PurchasingPaymentComponent from "../../components/purchasing-payment";
import clsx from "clsx";
import Image from "next/image";
import HEADER_LOGO from "@/public/images/header-logo.svg";
import { PurchaseStepsData } from "@/modules/order/domain/entities/order";
import LoadingComponent from "@/core/components/common/loading";
import { WalletAddressInterface } from "@/modules/profile/domain/entities/wallet-address";

export enum Steps {
  Rules,
  ChooseAddress,
  Invoice,
  PaymentMethod,
}
type PropTypes = {
  state: Steps;
  onNext: () => void;
  onPrev: () => void;
  data?: PurchaseStepsData;
  address?: WalletAddressInterface;
  setAddress: (address?: WalletAddressInterface) => void;
};
export default function PurchaseView(props: PropTypes) {
  const { state, onNext, onPrev, data, address, setAddress } = props;
  const mainContent = useMemo(() => {
    if (!data) {
      return <LoadingComponent />;
    }
    switch (state) {
      case Steps.Rules:
        return <PurchasingRulesComponent {...{ onNext, onPrev, data }} />;
      case Steps.ChooseAddress:
        return (
          <PurchasingAddressComponent
            {...{ onNext, onPrev, address, setAddress }}
          />
        );
      case Steps.Invoice:
        return (
          <PurchasingInvoiceComponent
            {...{ onNext, onPrev, data, address: address! }}
          />
        );
      case Steps.PaymentMethod:
        return (
          <PurchasingPaymentComponent
            {...{ onNext, onPrev, data, addressId: address?.id }}
          />
        );
    }
  }, [data, state]);
  return (
    <Box className={styles.root} bgcolor="background.secondary">
      <div className={clsx(styles.header, "mobile-up")}>
        <Image src={HEADER_LOGO} />
      </div>
      <Container maxWidth="sm">
        <div className={styles.stepperWrapper}>
          <OrderStepperComponent
            current={state}
            steps={[
              {
                icon: <RulesIcon />,
                value: Steps.Rules,
                title: "قوانین",
              },
              {
                icon: <WalletOutlinedIcon />,
                activeIcon: <WalletFilledIcon />,
                value: Steps.ChooseAddress,
                title: "آدرس ارزی",
              },
              {
                icon: <ReceiptOutlinedIcon />,
                activeIcon: <ReceiptFilledIcon />,
                value: Steps.Invoice,
                title: "پیش فاکتور",
              },
              {
                icon: <PaymentIcon />,
                value: Steps.PaymentMethod,
                title: "پرداخت",
              },
            ]}
          />
        </div>
        {mainContent}
      </Container>
    </Box>
  );
}
