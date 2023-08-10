import { BoxProps } from "@mui/material";
import { useMemo } from "react";
import OrderStepperView from "./order-stepper.view";

type PropTypes<T> = {
  steps: { icon: any; activeIcon?: any; value: T; title: string }[];
  current: T;
} & BoxProps;
export default function OrderStepperComponent<T>(props: PropTypes<T>) {
  const { steps, current } = props;

  const currentIdx = useMemo(() => {
    return steps.findIndex((s) => s.value === current);
  }, [steps, current]);

  return <OrderStepperView {...props} {...{ currentIdx }} />;
}
