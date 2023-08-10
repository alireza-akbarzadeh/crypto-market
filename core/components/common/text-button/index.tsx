import { TypographyProps } from "@mui/material";
import { MouseEventHandler, useState } from "react";
import TextButtonView from "./text-button.view";

type PropTypes = { disabled?: boolean } & TypographyProps;
export default function TextButtonComponent(props: PropTypes) {
  const { onClick, disabled, ...other } = props;
  const [loading, setLoading] = useState(false);

  const handleClick: MouseEventHandler<HTMLSpanElement> = async (e) => {
    if (disabled || loading || !onClick) return;
    setLoading(true);
    await onClick(e);
    setLoading(false);
  };

  return (
    <TextButtonView
      onClick={handleClick}
      disabled={disabled || loading}
      loading={loading}
      {...other}
    />
  );
}
