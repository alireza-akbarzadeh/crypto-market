import React, { useEffect, useState } from "react";
import { Fade, Box } from "@mui/material";

interface PropTypes<T> {
  children: (variable: T) => any;
  variable: T;
  duration?: number;
  container?: any;
  containerProps?: any;
}
export default function FadeContent<T>({
  children,
  variable,
  duration = 200,
  container: Container = Box,
  containerProps = {},
}: PropTypes<T>) {
  const [_var, _setVar] = useState(variable);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    // if (variable === _var) return;
    setFadeIn(false);
    const timeout = setTimeout(() => {
      _setVar(variable);
      setFadeIn(true);
    }, duration);
    return () => {
      clearTimeout(timeout);
    };
  }, [variable, duration]);

  return (
    <Fade in={fadeIn}>
      <Container {...containerProps}>{children(_var)}</Container>
    </Fade>
  );
}
