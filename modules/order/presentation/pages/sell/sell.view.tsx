import styles from "./sell.module.scss";
import { useMemo } from "react";
import {
  PaymentIcon,
  RulesIcon,
  WalletOutlinedIcon,
} from "@/core/components/common/custom-icon";
import { Box, Container } from "@mui/material";
import OrderStepperComponent from "../../components/order-stepper";
import SellingTypeComponent from "../../components/selling-type";
import Image from "next/image";
import HEADER_LOGO from "@/public/images/header-logo.svg";
import clsx from "clsx";
import { SellStepsData } from "@/modules/order/domain/entities/order";
import LoadingComponent from "@/core/components/common/loading";
import SellAddressComponent from "../../components/sell-address";
import SellRulesComponent from "../../components/sell-rules";

export enum Steps {
  Rules,
  Type,
  Sending,
}
type PropTypes = {
  state: Steps;
  onPrev: () => void;
  onNext: (data?: any) => void;
  data?: SellStepsData;
  ibanId?: string;
};
export default function SellView(props: PropTypes) {
  const { state, onNext, onPrev, data, ibanId } = props;

  const mainContent = useMemo(() => {
    if (!data) {
      return <LoadingComponent />;
    }
    switch (state) {
      case Steps.Rules:
        return <SellRulesComponent {...{ onNext, onPrev, data }} />;
      case Steps.Type:
        return <SellingTypeComponent {...{ onNext, onPrev }} />;
      case Steps.Sending:
        return <SellAddressComponent {...{ onNext, onPrev, ibanId }} />;
    }
    return null;
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
                icon: <PaymentIcon />,
                value: Steps.Type,
                title: "روش تسویه",
              },
              {
                icon: <WalletOutlinedIcon />,
                value: Steps.Sending,
                title: "ارسال ارز",
              },
            ]}
          />
        </div>
        {mainContent}
      </Container>
    </Box>
  );
}
