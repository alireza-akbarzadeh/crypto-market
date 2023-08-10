import styles from "./order-stepper.module.scss";
import { Fragment } from "react";
import { Box, BoxProps, Typography } from "@mui/material";
import clsx from "clsx";

type PropTypes<T> = {
  steps: { icon: any; activeIcon?: any; value: T; title: string }[];
  current: T;
  currentIdx: number;
} & BoxProps;
export default function OrderStepperView<T>(props: PropTypes<T>) {
  const { steps, current, className, currentIdx, ...other } = props;
  return (
    <Box {...other} className={clsx(styles.stepper, className)}>
      {steps.map((step, idx) => {
        const past = currentIdx >= idx;
        const color = past ? "primary.main" : "secondary.main";
        const activeIcon = step.activeIcon || step.icon;
        return (
          <Fragment key={step.value as any}>
            {Boolean(idx) && (
              <Box borderColor={color} className={styles.divider} />
            )}
            <Box
              borderColor={color}
              border={past ? 2 : 1}
              color={color}
              className={styles.iconWrapper}
            >
              {past ? activeIcon : step.icon}
              <Typography
                component="span"
                variant="overline"
                className={styles.title}
              >
                {step.title}
              </Typography>
            </Box>
          </Fragment>
        );
      })}
    </Box>
  );
}
