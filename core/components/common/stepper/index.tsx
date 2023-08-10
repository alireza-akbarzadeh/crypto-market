import { Fragment, useMemo } from "react";
import { Box, Divider, Typography } from "@mui/material";
import styles from "./Stepper.module.scss";
import clsx from "clsx";

type Props<T, V = T | any> = {
  data: T[];
  current: V;
  valueSelector: (item: T, index: number) => V;
  labelSelector: (item: T) => string;
  innerLabelSelector?: (item: T, index: number) => string;
  filledColor?: string;
  filledTextColor?: string;
  disabledColor?: string;
  disabledTextColor?: string;
};
export default function Stepper<T>(props: Props<T>) {
  const {
    data,
    current,
    valueSelector,
    labelSelector,
    filledColor = "primary.main",
    filledTextColor = "primary.contrastText",
    disabledColor = "secondary.main",
    disabledTextColor = "secondary.contrastText",
    innerLabelSelector,
  } = props;

  const selectedIdx = useMemo(() => {
    if (current === -1) return data.length;
    return data.findIndex((i, idx) => valueSelector(i, idx) === current);
  }, [current, data]);

  return (
    <Box className={styles.root}>
      {data.map((item, index) => {
        // const filled = index <= selectedIdx;
        // const bgcolor = filled ? filledColor : disabledColor;
        // const color = filled ? filledTextColor : disabledTextColor;
        return (
          <Fragment key={valueSelector(item, index)}>
            {/* {Boolean(index) && (
              <Divider className={styles.line} sx={{ borderColor: bgcolor }} />
            )} */}
            <Box
              className={clsx({
                [styles.itemContainer]: true,
                [styles.filled]: index < selectedIdx,
                [styles.current]: index === selectedIdx,
                [styles.remained]: index > selectedIdx,
              })}
            >
              <Box
                component="span"
                className={styles.item}
                // sx={{ borderColor: bgcolor }}
              >
                <Typography
                  component="span"
                  // sx={{ bgcolor }}
                  className={styles.itemText}
                  // color={color}
                >
                  {innerLabelSelector ? innerLabelSelector(item, index) : ""}
                </Typography>
              </Box>
              <Typography
                component="span"
                className={styles.label}
                variant="body2"
              >
                {labelSelector(item)}
              </Typography>
            </Box>
          </Fragment>
        );
      })}
    </Box>
  );
}
