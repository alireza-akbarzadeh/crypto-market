import styles from "./price-line.module.scss";
import { Box, Skeleton, Typography } from "@mui/material";
import { currencyFormat } from "@/core/helpers";
import CustomTooltip from "@/core/components/common/custom-tooltip";
import LoadingNumberComponent from "@/core/components/common/loading-number";
import clsx from "clsx";
import { useMemo } from "react";

type PropTypes = {
  children: any;
  value?: number | null;
  tooltip?: any;
  fontWeight?: any;
  loading?: boolean;
  divider?: boolean;
};
export default function PriceLineView(props: PropTypes) {
  const { children, value, tooltip, fontWeight, loading, divider } = props;
  const width = useMemo(() => {
    return Math.random() * 60 + 40;
  }, []);
  return (
    <Box className={styles.priceLine}>
      {tooltip ? (
        <CustomTooltip title={tooltip}>{children}</CustomTooltip>
      ) : (
        <Typography component="span" fontWeight={fontWeight}>
          {children}
        </Typography>
      )}
      <Box
        className={clsx({
          [styles.divider]: true,
          [styles.visible]: divider,
        })}
      />
      <Typography component="span" fontWeight={fontWeight}>
        {loading ? (
          <Skeleton width={width} />
        ) : typeof value === "number" ? (
          <>
            {currencyFormat(value)}{" "}
            <span className={styles.secondary}>تومان</span>
          </>
        ) : (
          "شبکه ارز را انتخاب کنید"
        )}
      </Typography>
    </Box>
  );
}
