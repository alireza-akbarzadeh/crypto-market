import { useComponentExists } from "@/core/hooks";
import { Button, ButtonProps, CircularProgress } from "@mui/material";
import { useState } from "react";

export default function LoadingButton({
  children,
  disabled,
  loading,
  endIcon,
  //   startIcon,
  onClick,
  ...other
}: ButtonProps & { loading?: boolean }) {
  const [_loading, _setLoading] = useState(false);
  const componentExists = useComponentExists();

  const handleClick = async (e: any) => {
    if (!onClick) return;

    _setLoading(true);
    await onClick(e);
    if (componentExists) _setLoading(false);
  };

  return (
    <Button
      endIcon={
        loading || _loading ? (
          <CircularProgress size={16} color="inherit" />
        ) : (
          endIcon
        )
      }
      disabled={disabled || loading || _loading}
      onClick={handleClick}
      {...other}
    >
      {children}
    </Button>
  );
}
