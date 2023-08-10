import { currencyFormat } from "@/core/helpers";
import { TypographyProps } from "@mui/material";
import { useEffect, useState } from "react";
import LoadingNumberView from "./loading-number.view";

type PropTypes = {
  loading?: boolean;
  loadingLength?: number;
  component: any;
} & TypographyProps;
export default function LoadingNumberComponent(props: PropTypes) {
  const { loading, children, loadingLength = 7, ...other } = props;
  const [loadingText, setLoadingText] = useState("");

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        const randomNumber = Math.round(Math.random() * 10 ** loadingLength);
        setLoadingText(currencyFormat(randomNumber, " تومان"));
      }, 60);
      return () => {
        clearInterval(interval);
      };
    }
  }, [loading]);

  return (
    <LoadingNumberView {...other} children={loading ? loadingText : children} />
  );
}
